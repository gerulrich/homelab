import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Grid } from "@mui/material";
import { useTranslation } from 'react-i18next';
import PageContainer from "@app/components/container/PageContainer"
import Breadcrumb from '@app/components/layout/full/shared/Breadcrumb';
import ParentCard from "@app/components/common/ParentCard";
import AssetForm from "@app/views/investments/fragments/AssetForm";
import axios from '@app/services/homelab'

const BCrumb = [
  {
    to: '/',
    title: 'home',
  },
  {
    to: '/investments/assets',
    title: 'assets',
  },
  {
    title: 'editAsset',
  },
];

export const EditAsset = () => {
  const { t } = useTranslation();
  const { assetId } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    asset_name: '',
    symbol: '',
    market: '',
    asset_type: '',
    icon: '',
    description: '',
    price: 0,
    currency: '',
    ratio: 1
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/investments/assets/${assetId}`)
      .then(resp => {
        const { name, type, price, ...others } = resp.data;
        setInitialValues({
          asset_name: name,
          asset_type: type,
          price: price.value,
          currency: price.currency,
          ...others
        });
      }).catch(err => {
        setError(err.message);
      });
  }, [assetId]);

  const handleSubmit = (asset) => {
    setError(null);
    const { asset_name, asset_type, price, currency, ...others } = asset;
    axios.put(`/investments/assets/${assetId}`, {
      name: asset_name,
      type: asset_type,
      ...others
    }).then(() => navigate("/investments/assets/"))
      .catch(err => {
        setError(t('editAsset.errorSavingAsset'));
      });
  };


  return (
    <PageContainer title={t('page.title.editAsset')} description={t('page.description.editAsset')}>
      <Breadcrumb title={t('page.breadcrumb.investments')} items={BCrumb.map(item => ({ ...item, title: t(`page.breadcrumb.${item.title}`) }))} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ParentCard title={t('form.title.editAsset')}>
            {error && (<Alert severity="error">{error}</Alert>)}
            <AssetForm initialValues={initialValues} onSubmit={handleSubmit} />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  )
}

export default EditAsset;
