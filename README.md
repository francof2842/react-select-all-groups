# react-select-all-groups
Modify react-select Library to have a select all for groups

This modification is based on the original modification for Select All made by Alex Escalante

https://medium.com/@alex_escalante/react-select-alloptionoptions-with-a-single-click-1ebf5a33fe31

In order to work you must specify 

allowSelectAll = true

hasGroups = true (if you have groups in you select options)

Also the format of your groups must be the following

    const options = [
      {
        label: label1,
        group: group1,
        options: items1,
      },
      {
        label: label2,
        group: group2,
        options: items2,
      },
    ];


All notes will be welcome, thanks for your time.