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
    <PageContainer description={t('page.description.channels')} title={t('page.title.channels')}>
      <Breadcrumb items={BCrumb.map(item => ({ ...item, title: t(`page.breadcrumb.${item.title}`) }))} title={t('page.breadcrumb.channels')} />
      <BlankCard>
        <ChannelsTableList admin={false}/>
      </BlankCard>
    </PageContainer>
  )
}

export default ListChannels;
