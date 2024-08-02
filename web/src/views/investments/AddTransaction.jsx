import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Grid } from "@mui/material";
import { useTranslation } from 'react-i18next';
import PageContainer from "@app/components/container/PageContainer"
import Breadcrumb from '@app/components/layout/full/shared/Breadcrumb';
import ParentCard from "@app/components/common/ParentCard";
import axios from '@app/services/homelab'
import TransactionForm from './fragments/TransactionForm';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/investments/transactions',
    title: 'Transaction',
  },
  {
    title: 'Add Transaction',
  },
];

export const AddTransaction = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    asset: {symbol: '', market: '', name: ''},
    quantity: 0,
    amount: 0,
    currency: '',
    type: '',
    date: new Date()
  });
  const [error, setError] = useState(null);

  const handleSubmit = (transaction) => {
    setError(null);
    const { quantity, amount, currency, asset, ...other } = transaction;
    const body = {
      quantity, price: { amount, currency }, asset: asset.uid, ...other
    }
    axios.post(`/investments/transactions/`, body).then(() => navigate("/investments/transactions/"))
      .catch(err => {
        setError(t('editTransaction.errorSavingTransaction'));
      });
  };


  return (
    <PageContainer title={t('transaction.add.pageTitle')} description={t('addTransaction.pageDescription')}>
      <Breadcrumb title={t('investment.breadcrumbTitle')} items={BCrumb.map(item => ({ ...item, title: t(`breadcrumb.${item.title}`) }))} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ParentCard title={t('transaction.add.formTitle')}>
            {error && (<Alert severity="error">{error}</Alert>)}
            <TransactionForm initialValues={initialValues} onSubmit={handleSubmit} />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  )
}

export default AddTransaction;
