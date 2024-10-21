import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { SearchedValueType } from 'types/generic';
import { filterBlockStyles } from 'pages/SubprojectsPage/components/SubprojectFilterBlock/styles';
import ProjectSelectWithSearch from 'components/ProjectSelectWithSearch';

type Props = {
  onFilter: (project: SearchedValueType | null) => void;
  filterProject: SearchedValueType | null;
}

const SubprojectFilterBlock = ({onFilter, filterProject}: Props) => {
  const { t } = useTranslation('subprojects', { keyPrefix: 'filters' });

  const onProjectChange = (newFilterProject: SearchedValueType) => {
    onFilter(newFilterProject);
  }

  return (
    <Box sx={filterBlockStyles}>
      <ProjectSelectWithSearch
        placeholder={t('project.placeholder')}
        noOptionsText={t('project.noOptionsText')}
        fieldProps={{
          name: "project",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onChange: onProjectChange,
          value: filterProject,
        }}
      />
    </Box>
  )
}

export default SubprojectFilterBlock;