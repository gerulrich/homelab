import { useTranslation } from 'react-i18next';
import PageContainer from "@app/components/container/PageContainer"
import BlankCard from '@app/components/common/BlankCard';
import Breadcrumb from '@app/components/layout/full/shared/Breadcrumb';
import TransactionsTableList from './fragments/TransactionsTableList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Transactions',
  },
];

export const ListTransactions = () => {
  const { t } = useTranslation();
  return (
    <PageContainer title={t('investment.title')} description={t('investment.description')}>
      <Breadcrumb title={t('investment.breadcrumbTitle')} items={BCrumb.map(item => ({ ...item, title: t(`breadcrumb.${item.title}`) }))} />
      <BlankCard>
        <TransactionsTableList />
      </BlankCard>
    </PageContainer>
  )
}

export default ListTransactions;
