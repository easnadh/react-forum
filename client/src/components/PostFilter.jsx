import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
  return <>
    <MyInput
        value={filter.query}
        onChange={e => setFilter({...filter, query: e.target.value})}
        placeholder="find me..."
    />
    <MySelect
        value={filter.sort}
        onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
        defaultValue="sort"
        option={[
          {value: 'id', name: 'by date'},
          {value: 'title', name: 'by name'},
          {value: 'body', name: 'by descr'}
        ]}
    />
  </>
};

export default PostFilter;