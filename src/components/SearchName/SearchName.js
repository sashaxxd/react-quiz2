import React from 'react';
import styles from './SearchName.module.css';

const SearchName = props => (
    <div>
    <div id={styles.FlexBoxContainer7}>
        <input type="text" id={styles.Editbox1} name="search" value={props.searchString}
               placeholder="&#1055;&#1086;&#1080;&#1089;&#1082; &#1087;&#1086; &#1080;&#1084;&#1077;&#1085;&#1080;"
               onChange={props.handleSearchChange}
        />
    </div>
    </div>
)

export default SearchName