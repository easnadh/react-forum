import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
  return (
      <div>
        <MyInput
            value={filter.query}
            onChange={e => setFilter({...filter, query: e.target.value})}
            placeholder="find me..."
        />
        <MySelect
            value={filter.sort}
            onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
            defaultValue="Sort"
            option={[
              {value: 'title', name: 'by name'},
              {value: 'body', name: 'by descr'}
            ]}
        />
      </div>
  );
};

export default PostFilter;