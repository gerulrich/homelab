import { useNavigate } from 'react-router-dom';
import { Grid } from "@mui/material";
import PageContainer from "@app/components/container/PageContainer"
import Breadcrumb from '@app/components/layout/full/shared/Breadcrumb';
import ParentCard from "@app/components/common/ParentCard";
import AssetForm from "@app/views/investments/fragments/AssetForm";
import axios from '@app/services/homelab'

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Activos / Instrumentos',
    to: '/investments/assets',
  },
  {
    title: 'Nuevo instrumento',
  },
];

export const AddAsset = () => {
  const navigate = useNavigate();
  const handleSubmit = (asset) => {
    const { asset_name, asset_type, price, currency, ...others } = asset;
    axios.post('/investments/assets/', {
      name: asset_name,
      type: asset_type,
      ...others
    }).then(resp => navigate("/investments/assets/"))
  }

  return (
    <PageContainer title="Horizontal Form" description="this is Horizontal Form page">
      <Breadcrumb title="Activos" items={BCrumb} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ParentCard title="Nuevo asset">
            { }
            <AssetForm initialValues={
              {
                asset_name: '',
                symbol: '',
                market: '',
                asset_type: '',
                icon: '',
                description: '',
                price: 0,
                currency: '',
                ratio: 1
              }}
              onSubmit={handleSubmit} />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  )
}

export default AddAsset;
