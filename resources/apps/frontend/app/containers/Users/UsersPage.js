import React, { Component } from 'react';
import cx from 'classnames';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from 'components/Layouts/Container';
import SearchIcon from '@material-ui/icons/Search';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import styles from './UsersPage.css';

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default class UsersPage extends Component {
  render() {
    return (
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Paper>
              <div className={styles.panelHeader}>
                <Typography variant="title" color="inherit">
                  Manage Users
                </Typography>
                <div className={styles.panelHeader__actions}>
                  <Button size="large" variant="raised" color="primary">
                    <AddIcon />
                    Add User
                  </Button>
                </div>
              </div>
              <div
                className={cx(
                  styles.panelHeader,
                  styles.panelHeader__withFilters
                )}
              >
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <Grid container className={styles.searchWrapper}>
                      <Grid item xs={10} className={styles.searchInputWrapper}>
                        <input
                          type="search"
                          placeholder="Search Users..."
                          className={styles.searchField}
                        />
                      </Grid>
                      <Grid item xs={2} className={styles.searchButtonWrapper}>
                        <button className={styles.searchButton}>
                          <SearchIcon />
                        </button>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Grid item md={9}>
                    <div className={styles.filters}>
                      <Button size="large" variant="raised" color="primary">
                        <AddIcon />
                        Add User
                      </Button>
                    </div>
                  </Grid> */}
                </Grid>
              </div>
              <div className={styles.panelBody}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Dessert (100g serving)</TableCell>
                      <TableCell numeric>Calories</TableCell>
                      <TableCell numeric>Fat (g)</TableCell>
                      <TableCell numeric>Carbs (g)</TableCell>
                      <TableCell numeric>Protein (g)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((n) => (
                      <TableRow key={n.id}>
                        <TableCell component="th" scope="row">
                          {n.name}
                        </TableCell>
                        <TableCell numeric>{n.calories}</TableCell>
                        <TableCell numeric>{n.fat}</TableCell>
                        <TableCell numeric>{n.carbs}</TableCell>
                        <TableCell numeric>{n.protein}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  count={100}
                  rowsPerPage={5}
                  page={1}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={() => {}}
                  onChangeRowsPerPage={() => {}}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
