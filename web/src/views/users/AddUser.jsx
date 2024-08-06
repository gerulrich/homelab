import { useNavigate } from 'react-router-dom';
import { Grid } from "@mui/material";
import PageContainer from "@app/components/container/PageContainer"
import Breadcrumb from '@app/components/layout/full/shared/Breadcrumb';
import ParentCard from "@app/components/common/ParentCard";
import axios from '@app/services/homelab'
import { useTranslation } from 'react-i18next';
import UserForm from './fragments/UserForm';

const BCrumb = [
  {
    to: '/',
    title: 'home',
  },
  {
    title: 'users',
    to: '/settings/users',
  },
  {
    title: 'newUser',
  },
];

export const AddUser = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleSubmit = (user) => {
    console.log(user);
     axios.post('/auth/users', user)
      .then(resp => navigate("/settings/users"))
  }

  return (
    <PageContainer title={t('page.title.addUser')} description={t('page.description.addUser')}>
      <Breadcrumb title={t('page.breadcrumb.users')} items={BCrumb.map(item => ({ ...item, title: t(`page.breadcrumb.${item.title}`) }))} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ParentCard title={t('form.title.newUser')}>
            { }
            <UserForm initialValues={
              {
                name: '',
                email: '',
                plan: '',
                picture: '',
                enabled: false,
                google: false
              }}
              onSubmit={handleSubmit} />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  )
}

export default AddUser;
