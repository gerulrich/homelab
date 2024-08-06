import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Grid } from "@mui/material";
import { useTranslation } from 'react-i18next';
import PageContainer from "@app/components/container/PageContainer"
import Breadcrumb from '@app/components/layout/full/shared/Breadcrumb';
import ParentCard from "@app/components/common/ParentCard";
import axios from '@app/services/homelab'
import UserForm from './fragments/UserForm';

const BCrumb = [
  {
    to: '/',
    title: 'home',
  },
  {
    to: '/settings/users',
    title: 'users',
  },
  {
    title: 'editUser',
  },
];

export const EditUser = () => {
  const { t } = useTranslation();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    plan: '',
    picture: '',
    enabled: false,
    google: false
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/auth/users/${userId}`)
      .then(resp => {
        setInitialValues(resp.data);
      }).catch(err => {
        setError(err.message);
      });
  }, [userId]);

  const handleSubmit = (user) => {
    setError(null);
    axios.put(`/auth/users/${userId}`, user).then(() => navigate("/settings/users/"))
      .catch(err => {
        setError(t('editUser.errorSavingUser'));
      });
  };


  return (
    <PageContainer title={t('page.title.editUser')} description={t('page.description.editUser')}>
      <Breadcrumb title={t('page.breadcrumb.users')} items={BCrumb.map(item => ({ ...item, title: t(`page.breadcrumb.${item.title}`) }))} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ParentCard title={t('form.title.editUser')}>
            {error && (<Alert severity="error">{error}</Alert>)}
            <UserForm initialValues={initialValues} onSubmit={handleSubmit} />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  )
}

export default EditUser;
