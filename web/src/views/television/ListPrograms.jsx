import { useTranslation } from 'react-i18next';
import PageContainer from "@app/components/container/PageContainer"
import BlankCard from '@app/components/common/BlankCard';
import Breadcrumb from '@app/components/layout/full/shared/Breadcrumb';
import ProgramTableList from './fragments/ProgramTableList';

const BCrumb = [
  {
    to: '/',
    title: 'home',
  },
  {
    title: 'programs',
  },
];

export const ListPrograms = () => {
  const { t } = useTranslation();
  return (
    <PageContainer title={t('page.title.programs')} description={t('page.description.programs')}>
      <Breadcrumb title={t('page.breadcrumb.programs')} items={BCrumb.map(item => ({ ...item, title: t(`page.breadcrumb.${item.title}`) }))} />
      <BlankCard>
        <ProgramTableList />
      </BlankCard>
    </PageContainer>
  )
}

export default ListPrograms;
