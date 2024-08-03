import { useTranslation } from 'react-i18next';
import PageContainer from "@app/components/container/PageContainer"
import BlankCard from '@app/components/common/BlankCard';
import Breadcrumb from '@app/components/layout/full/shared/Breadcrumb';
import TransactionsTableList from './fragments/TransactionsTableList';

const BCrumb = [
  {
    to: '/',
    title: 'home',
  },
  {
    title: 'transactions',
  },
];

export const ListTransactions = () => {
  const { t } = useTranslation();
  return (
    <PageContainer title={t('investment.title')} description={t('investment.description')}>
      <Breadcrumb title={t('page.breadcrumb.investments')} items={BCrumb.map(item => ({ ...item, title: t(`page.breadcrumb.${item.title}`) }))} />
      <BlankCard>
        <TransactionsTableList />
      </BlankCard>
    </PageContainer>
  )
}

export default ListTransactions;
