import { useTranslation } from 'react-i18next';
import PageContainer from "@app/components/container/PageContainer"
import BlankCard from '@app/components/common/BlankCard';
import Breadcrumb from '@app/components/layout/full/shared/Breadcrumb';
import ChannelsTableList from './fragments/ChannelsTableList';

const BCrumb = [
  {
    to: '/',
    title: 'home',
  },
  {
    title: 'channels',
  },
];

export const ListChannels = () => {
  const { t } = useTranslation();
  return (
    <PageContainer title={t('page.title.channels')} description={t('page.description.channels')}>
      <Breadcrumb title={t('page.breadcrumb.channels')} items={BCrumb.map(item => ({ ...item, title: t(`page.breadcrumb.${item.title}`) }))} />
      <BlankCard>
        <ChannelsTableList />
      </BlankCard>
    </PageContainer>
  )
}

export default ListChannels;
