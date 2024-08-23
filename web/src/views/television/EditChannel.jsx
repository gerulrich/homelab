import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Grid } from "@mui/material";
import { useTranslation } from 'react-i18next';
import PageContainer from "@app/components/container/PageContainer"
import Breadcrumb from '@app/components/layout/full/shared/Breadcrumb';
import ParentCard from "@app/components/common/ParentCard";
import axios from '@app/services/homelab'
import ChannelForm from './fragments/ChannelForm';

const BCrumb = [
  {
    to: '/',
    title: 'home',
  },
  {
    to: '/settings/channels',
    title: 'channels',
  },
  {
    title: 'editChannel',
  },
];

export const EditChannel = () => {
  const { t } = useTranslation();
  const { channelId } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    name: '',
    category: '',
    logo: '',
    epg_id: '',
    drm: { type: '', license_url: '', key_id: '', key: '' },
    number: 0,
    media_url: '',
    plan: '',
    enabled: false,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/tv/channels/${channelId}`)
      .then(resp => {
        setInitialValues(resp.data);
      }).catch(err => {
        setError(err.message);
      });
  }, [channelId]);

  const handleSubmit = (channel) => {
    setError(null);
    console.log(channel);
    axios.put(`/tv/channels/${channelId}`, channel).then(() => navigate("/settings/channels/"))
      .catch(err => {
        setError(t('editChannel.errorSavingChannel'));
      });
  };


  return (
    <PageContainer title={t('page.title.editChannel')} description={t('page.description.editChannel')}>
      <Breadcrumb title={t('page.breadcrumb.channels')} items={BCrumb.map(item => ({ ...item, title: t(`page.breadcrumb.${item.title}`) }))} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ParentCard title={t('form.title.editChannel')}>
            {error && (<Alert severity="error">{error}</Alert>)}
            <ChannelForm initialValues={initialValues} onSubmit={handleSubmit} />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  )
}

export default EditChannel;
