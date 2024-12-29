
import { useEffect, useRef } from 'react';
import ShakaPlayer from 'shaka-player-react';

export const VideoPlayer = ({media}) => {
  
    const ref = useRef(null);
    const config = {
        controlPanelElements: ['play_pause', 'time_and_duration', 'spacer', 'mute', 'volume', 'airplay', 'fullscreen', 'overflow_menu'],
        addSeekBar: true,
        customContextMenu : true,
        contextMenuElements : ['statistics'],
        statisticsList : ['width', 'height', 'playTime', 'bufferingTime'],
        addBigPlayButton: false,
        castReceiverAppId: '1BA79154',
        
    }
  
    useEffect(() => {
        try {
            window.getShakaInst = () => ref.current;
            const { player, ui } = ref.current;
            console.log(`Cambiando media: ${media}`)
            if (ref.current && media.media_url) {
                const clearKeys = {};
                ui.configure(config);            
                clearKeys[media.drm.key_id] = media.drm.key;
                player.configure({ drm: { clearKeys }});
            }
        } catch (error) {
            console.error('Error Shaka Player', error);
        }


        return () => {
            if (ref.current) {
                //ref.current.destroy();
                console.log('Shaka Player destroyed');
            }
        };
    }, [media]); 
    return (
        <ShakaPlayer ref={ref} autoPlay={false} src={media?.media_url}
                  data-shaka-player-container
                  data-shaka-player-cast-receiver-id="1BA79154"
        />
    )
}