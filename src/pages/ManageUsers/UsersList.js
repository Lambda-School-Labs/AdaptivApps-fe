import React from 'react';
import { Flex, Input } from 'adaptiv-ui';
import { useQuery } from 'react-apollo';
import { GET_PROFILES } from './queries';
import MaterialTable from 'material-table';

const UsersList = () => {
  const { data } = useQuery(GET_PROFILES);
  console.log(data);

  return (
    <Flex col m="0 2% 0 2%">
      <MaterialTable
        title="Registered Users"
        data={data?.profiles}
        columns={[
          { title: 'Firstname', field: 'firstName' },
          { title: 'Lastname', field: 'lastName' },
          { title: 'Birthday', field: 'birthday' },
          { title: 'Disability', field: 'disability' },
          { title: 'Legal Status', field: 'legal' },
        ]}
        options={{
          search: true,
          showTitle: false,
          paging: true,
          emptyRowsWhenPaging: false,
          cellStyle: {
            fontSize: '1.2rem',
          },
          headerStyle: {
            fontSize: '1.2rem',
          },
        }}
      />
    </Flex>
  );
};

export default UsersList;