import generatedData from "./generatedClients";

const stickerData = {
    columns: [
      {
        label: 'Client',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Category',
        field: 'category',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Amount',
        field: 'amount',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Payment Method',
        field: 'paymentMethod',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Currency',
        field: 'currency',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Agent',
        field: 'agent',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 100
      },
      {
        label: 'createdAt',
        field: 'createdAt',
        sort: 'asc',
        width: 100
      }
    ],
    rows: generatedData[1]
    
  };

  export const organisationData = {
    columns: [
        {
          label: 'Logo',
          field: 'name',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Phone No.',
          field: 'number',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Address',
          field: 'currency',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Name',
          field: 'agent',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Role',
          field: 'status',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Phone',
          field: 'createdAt',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Email',
          field: 'createdAt',
          sort: 'asc',
          width: 100
        }
      ],
      rows: generatedData[1]
    }


  export default stickerData