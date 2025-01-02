import { Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { teal } from '@mui/material/colors';
import React, { useState } from 'react';
import { colors } from '../../../Data/Filter/color';
import { price } from '../../../Data/Filter/price';
import { discount } from '../../../Data/Filter/discount';
import { useSearchParams } from 'react-router-dom';

const FilterSection = () => {
  const [expandColor, setExpandColor] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedDiscount, setSelectedDiscount] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleColorToggle = () => {
    setExpandColor(!expandColor);
  };

  const updateFilterParams = (e) => {
    const { value, name } = e.target;

    if (name === 'color') setSelectedColor(value);
    if (name === 'price') setSelectedPrice(value);
    if (name === 'discount') setSelectedDiscount(value);

    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    setSelectedColor('');
    setSelectedPrice('');
    setSelectedDiscount('');
    setSearchParams(new URLSearchParams()); 
  };

  return (
    <div className='-z-50 space-y-5 bg-white'>
      <div className='flex items-center justify-between h-[40px] px-9 lg:border-r'>
        <p className='text-lg font-semibold'>Filters</p>
        <Button
          onClick={clearAllFilters}
          size='small'
          className='text-teal-600 cursor-pointer font-semibold'>
          Clear All
        </Button>
      </div>
      <Divider />
      <div className='px-9 space-y-6'>
        
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: teal[500],
                pb: '14px',
              }}
              className='text-2xl font-semibold'
              id='color'>
              Color
            </FormLabel>
            <RadioGroup
              aria-labelledby='color'
              value={selectedColor} 
              name='color'
              onChange={updateFilterParams}>
              {colors.slice(0, expandColor ? colors.length : 5).map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.name}
                  control={<Radio />}
                  label={
                    <div className='flex items-center gap-3'>
                      <p>{item.name}</p>
                      <span
                        style={{ backgroundColor: item.hex }}
                        className={`h-5 w-5 rounded-full ${item.name === 'white' ? 'border' : ''}`}
                      />
                    </div>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
          <div>
            <button
              onClick={handleColorToggle}
              className='text-primary-color cursor-pointer hover:text-teal-900 flex items-center'>
              {expandColor ? 'hide' : `+${colors.length - 5} more`}
            </button>
          </div>
        </section>

        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: teal[500],
                pb: '14px',
              }}
              className='text-2xl font-semibold'
              id='price'>
              Price
            </FormLabel>
            <RadioGroup
              aria-labelledby='price'
              value={selectedPrice} 
              onChange={updateFilterParams}
              name='price'>
              {price.map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size='small' />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
        <Divider />

        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: teal[500],
                pb: '14px',
              }}
              className='text-2xl font-semibold'
              id='discount'>
              Discount
            </FormLabel>
            <RadioGroup
              aria-labelledby='discount'
              value={selectedDiscount} 
              onChange={updateFilterParams}
              name='discount'>
              {discount.map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size='small' />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
      </div>
    </div>
  );
};

export default FilterSection;
