import { useTranslation } from 'react-i18next';
import PageContainer from "@app/components/container/PageContainer"
import BlankCard from '@app/components/common/BlankCard';
import Breadcrumb from '@app/components/layout/full/shared/Breadcrumb';
import UsersTableList from './fragments/UsersTableList';

const BCrumb = [
  {
    to: '/',
    title: 'home',
  },
  {
    title: 'users',
  },
];

export const ListTransactions = () => {
  const { t } = useTranslation();
  return (
    <PageContainer title={t('page.title.users')} description={t('page.description.users')}>
      <Breadcrumb title={t('page.breadcrumb.users')} items={BCrumb.map(item => ({ ...item, title: t(`page.breadcrumb.${item.title}`) }))} />
      <BlankCard>
        <UsersTableList />
      </BlankCard>
    </PageContainer>
  )
}

export default ListTransactions;
