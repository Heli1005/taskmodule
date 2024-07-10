export const taskHeaderList =()=>{
    return [
        {
            id: 'title',
            name: 'Title',
            type: 'text',
            w: '100px'
        },
        {
            id: 'desc',
            name: 'Description',
            type: 'text',
            w: '100px'
        },
        {
            id: 'duedate',
            name: 'Due Date',
            type: 'datetime',
            w: '100px'
        },
        {
            id: 'timer',
            name: 'Timer',
            type: 'timer',
            w: '200px'
        },
        {
            id: 'iscompleted',
            type: 'radio',
            w: '100px',
            values: [
                {
                    value: 1,
                    name: 'Completed',
                    bg: 'green.500'
                },
                {
                    value: 0,
                    name: 'Pending',
                    bg: 'red.500'
                }
            ],
            name: 'Status'
        },
        {
            id: 'action',
            name: 'Action',
            type: 'action',
            w: '100px'
        }
    ]
}