import { useTranslation } from 'react-i18next';
import PageContainer from "@app/components/container/PageContainer"
import BlankCard from '@app/components/common/BlankCard';
import Breadcrumb from '@app/components/layout/full/shared/Breadcrumb';
import AssetsTableList from './fragments/AssetsTableList';

const BCrumb = [
  {
    to: '/',
    title: 'home',
  },
  {
    title: 'assets',
  },
];

export const ListAssets = () => {
  const { t } = useTranslation();
  return (
    <PageContainer title={t('page.title.investment')} description={t('page.description.investment')}>
      <Breadcrumb title={t('page.breadcrumb.investments')} items={BCrumb.map(item => ({ ...item, title: t(`page.breadcrumb.${item.title}`) }))} />
      <BlankCard>
        <AssetsTableList />
      </BlankCard>
    </PageContainer>
  )
}

export default ListAssets;
