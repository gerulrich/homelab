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
    title: 'home',
  },
  {
    to: '/investments/transactions',
    title: 'transaction',
  },
  {
    title: 'editTransaction',
  },
];

export const EditTransaction = () => {
  const { t } = useTranslation();
  const { transactionId } = useParams();
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

  useEffect(() => {
    axios.get(`/investments/transactions/${transactionId}`)
      .then(resp => {
        const { date, price, ...other } = resp.data;
        setInitialValues({
          date: new Date(date),
          amount: price.amount,
          currency: price.currency,
          ...other
        });
      }).catch(err => {
        setError(err.message);
      });
  }, [transactionId]);

  const handleSubmit = (transaction) => {
    setError(null);
    const { quantity, amount, currency, asset, ...other } = transaction;
    const body = {
      quantity, price: { amount, currency }, asset: asset.uid, ...other
    }
    axios.put(`/investments/transactions/${transactionId}`, body).then(() => navigate("/investments/transactions/"))
      .catch(err => {
        setError(t('editTransaction.errorSavingTransaction'));
      });
  };


  return (
    <PageContainer title={t('page.title.editTransaction')} description={t('page.description.editTransaction')}>
      <Breadcrumb title={t('page.breadcrumb.investments')} items={BCrumb.map(item => ({ ...item, title: t(`page.breadcrumb.${item.title}`) }))} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ParentCard title={t('form.title.editTransaction')}>
            {error && (<Alert severity="error">{error}</Alert>)}
            <TransactionForm initialValues={initialValues} onSubmit={handleSubmit} />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  )
}

export default EditTransaction;
