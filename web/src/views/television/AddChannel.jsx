import { useNavigate } from 'react-router-dom';
import { Grid } from "@mui/material";
import PageContainer from "@app/components/container/PageContainer"
import Breadcrumb from '@app/components/layout/full/shared/Breadcrumb';
import ParentCard from "@app/components/common/ParentCard";
import axios from '@app/services/homelab'
import { useTranslation } from 'react-i18next';
import ChannelForm from './fragments/ChannelForm';

const BCrumb = [
  {
    to: '/',
    title: 'home',
  },
  {
    title: 'channels',
    to: '/settings/channels',
  },
  {
    title: 'newChannel',
  },
];

export const AddChannel = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleSubmit = (user) => {
    console.log(user);
     axios.post('/tv/channels', user)
      .then(resp => navigate("/settings/channels"))
  }

  return (
    <PageContainer title={t('page.title.addChannel')} description={t('page.description.addChannel')}>
      <Breadcrumb title={t('page.breadcrumb.channels')} items={BCrumb.map(item => ({ ...item, title: t(`page.breadcrumb.${item.title}`) }))} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ParentCard title={t('form.title.newChannel')}>
            { }
            <ChannelForm initialValues={
              {
                name: '',
                category: '',
                logo: '',
                epg_id: '',
                drm: { type: '', license_url: '', key_id: '', key: '' },
                number: 0,
                media_url: '',
                plan: '',
                enabled: false,
              }}
              onSubmit={handleSubmit} />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  )
}

export default AddChannel;
