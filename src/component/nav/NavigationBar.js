import React, { useState } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CartView from './../cartView/CartView';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: 'auto',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Input = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const NavigationBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [categories, setCategories] = useState([]);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  const handleCartItem = () => {
    navigate('/CartView');
    console.log("handle")
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleHomePage = () => {
    navigate('/home');
  }

  const handleUserPage = () => {
    navigate('/user');
    console.log("handleUserPage::");
  }

  const handleSearchPage = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/api/webview/search/?q=${searchValue}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/search', { state: { product: response.data.results } });
    } catch (error) {
      console.log(error);
    }
  }

  const [searchValue, setSearchValue] = useState('');

  const handleSearch_Page = () => {
    // Here you can access the search input value via the searchValue state
    console.log("Search value:", searchValue);
    // Perform any actions with the search value here
  };

  const handleChange = (event) => {
    // Update the searchValue state whenever the input changes
    setSearchValue(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    fetchCategories();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategory = async (categoryName) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/api/webview/category_search/?q=${categoryName}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/search', { state: { product: response.data.results } });
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={handleHomePage}>
          Wowman
        </Typography>
        <IconButton color="inherit" onClick={handleUserPage}>
          <Tooltip title="orders"><AccountCircleIcon /></Tooltip>
        </IconButton>
        <IconButton color="inherit" onClick={handleCartItem}>
          <Tooltip title="Cart"><ShoppingCartIcon /></Tooltip>
        </IconButton>
        <Button
          id="demo-positioned-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          style={{ color: 'white' }}
        >
          <Tooltip title="Category"><CategoryIcon /></Tooltip>

        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {categories.map((category, index) => (
            <MenuItem key={index} onClick={() => handleCategory(category.name)}>
              {category.name}
            </MenuItem>
          ))}
        </Menu>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <Input
            placeholder="Search…"
            name='search'
            inputProps={{ 'aria-label': 'search' }}
            value={searchValue}
            onChange={handleChange}
          />
          <Button color="inherit" onClick={handleSearchPage}>Search</Button>
        </Search>

        <Button color="inherit" onClick={handleLogout}>Logout</Button>
        {/* <Button variant="contained" {...bindTrigger(popupState)}>
          Catgeory
        </Button>
        <Menu {...bindMenu(popupState)}>
          <MenuItem onClick={popupState.close}>Profile</MenuItem>
          <MenuItem onClick={popupState.close}>My account</MenuItem>
          <MenuItem onClick={popupState.close}>Logout</MenuItem>
        </Menu> */}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;

// export default NavigationBar;
