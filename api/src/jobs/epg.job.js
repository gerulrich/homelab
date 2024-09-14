const { getPrograms, getJwt } = require('@app/services');
const Channel = require('@app/models/television/channel');
const Program = require('@app/models/television/program');
const Notification = require('@app/models/notification.model');

const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
const random = (min, max) => Math.floor((((max - min) * Math.random()) + 3) * 1000);

const getChannels = async () => await Channel.find({ enabled: true, epg_id: { $nin: [null, ''] }, number: { $gt: 0 }});

const savePrograms = async (programs) => {
  for (const program of programs) {
    const conditions = {
      epg_id: program.epg_id,
      start: program.start,
      end: program.end,
      epg_name: program.epg_name,
    };
    await Program.findOneAndUpdate(conditions, program, { new: true, upsert: true });
  }
};

const getEpgData = async (jwt, channel) => {
  const programs = await getPrograms(jwt, channel.number);
  return programs.map(p => {
    const urls = (p.resources.length > 0) ? p.resources.filter(item => item.protocol === 'DASH' && item.encryption === 'Widevine') : [];
    const media_url = (urls.length > 0) ? urls[0].url : '';
    const image = p.images.filter(item => item.usage === 'BROWSE')
      .map(img => `https://static.flow.com.ar/images/${p.programId}/BROWSE/224/320/0/0/${img.suffix}.${img.format}`)[0];
    return {
      epg_id: p.id,
      title: p.title,
      description: p.description,
      start: new Date(p.startTime).toISOString(),
      end: new Date(p.endTime).toISOString(),
      media_url: media_url.replace('http://', 'https://'),
      drm: (media_url !== '') ? channel.drm : {},
      enabled: channel.enabled,
      image,
      type: p.type,
      show_type: p.showType,
      duration: p.duration,
      episode_title: p.episodeTitle,
      genre: p.genre,
      season_number: p.seasonNumber,
      episode_number: p.episodeNumber,
      series_id: p.seriesId,
      season_id: p.seasonId,
      program_id: p.programId,
      channel: channel._id,
      channel_name: channel.name,
      epg_name: channel.epg_id,
    };
  });
};

const processChannels = async (channels) => {
  let total = 0;
  const jwt = await getJwt();
  for (const channel of channels) {
    console.log(`Processing channel ${channel.number} - ${channel.name}`);
    const programs = await getEpgData(jwt, channel);
    if (programs.length > 0) {
      console.log(`Saving ${programs.length} programs for channel ${channel.name}`);
      await savePrograms(programs);
      total += programs.length;
    }
    await sleep(random(5, 15));
  }
  return total;
};

let running = false;

const epgJob = async (io) => {
  if (running) {
    console.log('EPG job already running');
    return;
  }

  running = true;
  try {
    console.log('EPG job running');
    const channels = await getChannels();
    const total = await processChannels(channels);
    console.log(`EPG job finished, ${total} programs saved`);
    const result = await Program.deleteMany({ start: { $lt: new Date(Date.now() - (24 * 60 * 60 * 1000)) }, media_url: { $in: [null, ''] } });
    console.log(`Deleted ${result.deletedCount} programs older than 24 hours where media_url is null`);
  } catch (error) {
    console.error('EPG job encountered an error:', error);
    await Notification.findOneAndUpdate(
      { type: 'system',
        component: 'epg',
        severity: 'error',
        content: 'EPG job encountered an error',
        read: false 
      }, { created: new Date() }, { upsert: true });
    io.to('admin').emit('notification', { 
      type: 'system',
      component: 'epg',
      severity: 'error',
      content: 'EPG job encountered an error' });
  } finally {
    running = false;
  }
};

module.exports = epgJob;