import React, { useState } from "react";
import { ApiHelper } from "../helpers";
import { PersonInterface } from "../interfaces"
import { TextField, Button, Table, TableBody, TableRow, TableCell, Icon } from "@mui/material";

interface Props {
  addFunction: (person: PersonInterface) => void,
  person?: PersonInterface,
  getPhotoUrl: (person: PersonInterface) => string,
  searchClicked?: () => void,
  filterList?: string[]
}

export const PersonAdd: React.FC<Props> = ({ addFunction, getPhotoUrl, searchClicked, filterList = [] }) => {
  const [searchResults, setSearchResults] = useState<PersonInterface[]>([]);
  const [searchText, setSearchText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { e.preventDefault(); setSearchText(e.currentTarget.value); }
  const handleKeyDown = (e: React.KeyboardEvent<any>) => { if (e.key === "Enter") { e.preventDefault(); handleSearch(null); } }

  const handleSearch = (e: React.MouseEvent) => {
    if (e !== null) e.preventDefault();
    let term = searchText.trim();
    ApiHelper.post("/people/search", { term: term }, "MembershipApi")
      .then((data: PersonInterface[]) => {
        const filteredResult = data.filter(s => !filterList.includes(s.id))
        setSearchResults(filteredResult);
        if (searchClicked) {
          searchClicked();
        }
      });
  }
  const handleAdd = (e: React.MouseEvent) => {
    let anchor = e.currentTarget as HTMLAnchorElement;
    let idx = anchor.getAttribute("data-index");
    let sr: PersonInterface[] = [...searchResults];
    let person: PersonInterface = sr.splice(parseInt(idx), 1)[0];
    setSearchResults(sr);
    addFunction(person);
  }

  let rows = [];
  for (let i = 0; i < searchResults.length; i++) {
    let sr = searchResults[i];
    rows.push(
      <TableRow key={sr.id}>
        <TableCell><img src={getPhotoUrl(sr)} alt="avatar" /></TableCell>
        <TableCell>{sr.name.display}</TableCell>
        <TableCell>
          <button className="text-success no-default-style" aria-label="addPerson" data-index={i} onClick={handleAdd}><Icon>person</Icon> Add</button>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TextField fullWidth name="personAddText" label="Person" value={searchText} onChange={handleChange} onKeyDown={handleKeyDown}
        InputProps={{ endAdornment: <Button variant="contained" id="searchButton" data-cy="search-button" onClick={handleSearch}>Search</Button> }}
      />
      <Table size="small" id="householdMemberAddTable"><TableBody>{rows}</TableBody></Table>
    </>
  );
}
