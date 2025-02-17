
import { useEffect, useRef } from 'react';
import ShakaPlayer from 'shaka-player-react';

export const VideoPlayer = ({media, onError}) => {
    const BAD_HTTP_STATUS = 1001;
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
        if (media.media_url === null || media.media_url === '') {
            return;
        }
        try {
            const { player, ui } = ref.current;
            if (media.drm.type === 'clearkeys') {
                const clearKeys = {};
                ui.configure(config);
                clearKeys[media.drm.key_id] = media.drm.key;
                player.configure({ drm: { clearKeys }});
                ref.current.poster = media.image;
                
                const nwEngine = player.getNetworkingEngine();

                const networkErrorHandler = (event) => {
                    const code = event.error.code;
                    if (code === BAD_HTTP_STATUS) {
                        const status = event.error.data[1];
                        switch (status) {
                            case 404:
                                onError('Manifest not found (404)');
                                break;
                            case 503:
                                onError('Service unavailable (503)');
                                break;
                            default:
                                onError('Network error');
                                break;
                        }
                    }
                };

                player.addEventListener('error', networkErrorHandler);
                player.addEventListener('load', networkErrorHandler);
                nwEngine.addEventListener('retry', networkErrorHandler);


            }
        } catch (error) {
            console.error('Error Shaka Player', error);
        }
    }, [media]); 
    return (
        <ShakaPlayer ref={ref} autoPlay={false} src={media?.media_url}
                  data-shaka-player-container
                  data-shaka-player-cast-receiver-id="1BA79154"
        />
    )
}