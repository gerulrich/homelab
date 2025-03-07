import { useTranslation } from 'react-i18next';
import PageContainer from "@app/components/container/PageContainer"
import BlankCard from '@app/components/common/BlankCard';
import Breadcrumb from '@app/components/layout/full/shared/Breadcrumb';
import ContainersGrid from './ContainersGrid';

const BCrumb = [
  {
    to: '/',
    title: 'home',
  },
  {
    title: 'homelab',
  },
];

export const ViewPodmanContainers = () => {
  const { t } = useTranslation();
  return (
    <PageContainer title={t('page.title.homelab')} description={t('page.description.homelab')}>
      <Breadcrumb title={t('page.breadcrumb.homelab')} items={BCrumb.map(item => ({ ...item, title: t(`page.breadcrumb.${item.title}`) }))} />
      <BlankCard>
        <ContainersGrid />
      </BlankCard>
    </PageContainer>
  )
}

export default ViewPodmanContainers;
