import PropTypes from 'prop-types';
import { Grid, Button, MenuItem, Autocomplete, Box, TextField, Chip, Avatar, Typography, FormHelperText } from '@mui/material';
import * as Yup from 'yup';
import { Form, useFormik, FormikProvider } from 'formik';
import CustomFormLabel from '@app/components/customs/CustomFormLabel';
import CustomTextField from '@app/components/customs/CustomTextField';
import useMounted from '@app/components/guards/UseMounted';
import CustomSelect from '../../../components/customs/CustomSelect';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useState } from 'react';
import axios from '@app/services/homelab'

export const TransactionForm = ({ initialValues, onSubmit }) => {
  const mounted = useMounted();
  const [assets, setAssets] = useState([]);
  
  const fetchAssets = async(q) => {
    const response = await axios.get(`/investments/assets?q=${q}`)
    setAssets(response.data.items);
  }  
  
  const TransactionSchema = Yup.object().shape({
    date: Yup.date()
      .required('La fecha es requerida')
      .max(new Date(), 'La fecha no puede ser en el futuro'),
    asset: Yup.object()
      .required('El activo es requerido'),
    quantity: Yup.number('La cantidad debe ser un número')
      .required('La cantidad es requerida'),
    amount: Yup.number()
      .required('El monto es requerido'),
    currency: Yup.string()
      .required('La moneda es requerida')
      .oneOf(['USD', 'EUR', 'ARS'], 'Moneda no válida'),
    type: Yup.string()
      .required('El tipo de operación es requerido')
      .oneOf(['buy', 'sell', 'dividend', 'coupon', 'amortization'], 'Tipo de operación no válido'),
    details: Yup.string()
      .optional(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: TransactionSchema,
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      setSubmitting(true);
      onSubmit(values);
      try {
        if (mounted.current) {
          setStatus({ success: true });
          setSubmitting(false);
        }
      } catch (err) {
        if (mounted.current) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          
          
          {/* Date */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="quantity" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Fecha
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disableFuture
                id='date'
                name='date'
                format="dd/MM/yyyy"
                placeholder="DateTimePicker"
                value={formik.values.date}
                onChange={(value) => formik.setFieldValue("date", value, true)}
              />
            </LocalizationProvider>
          </Grid>

          {/* Asset */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="asset" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Activo
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Autocomplete
              freeSolo
              name="asset"
              options={assets}
              getOptionLabel={(asset) => asset ? asset.name : ''}
              isOptionEqualToValue={(asset, value) => asset.symbol === value.symbol && asset.market === value.market}
              renderOption={({key,...props}, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} key={key}>
                  <Avatar alt="option.icon" src={option.icon} />
                  <Typography m={2}>
                    {option.name} ({option.symbol})
                  </Typography>
                  </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  onChange={(event) => fetchAssets(event.target.value)}
                />
              )}
              value={formik.values.asset}
              onChange={(event, newValue) => formik.setFieldValue("asset", newValue, true)}
            />






          </Grid>

          
          {/* Quantity */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="quantity" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Cantidad
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <CustomTextField
              id="quantity"
              name='quantity'
              placeholder="Cantidad"
              {...getFieldProps('quantity')}
              error={Boolean(touched.quantity && errors.quantity)}
              helperText={touched.quantity && errors.quantity}
              fullWidth />
          </Grid>

          {/* Price */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="amount" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Precio
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              id="amount"
              name='amount'
              placeholder="Monto"
              {...getFieldProps('amount')}
              error={Boolean(touched.amount && errors.amount)}
              helperText={touched.amount && errors.amount}
              fullWidth />
          </Grid>
          <Grid item xs={12} sm={2}>
            <CustomSelect
              id="currency"
              name="currency"
              value={formik.values.currency}
              onChange={formik.handleChange}
              fullWidth>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="ARS">ARS</MenuItem>
            </CustomSelect>
            {touched.currency && formik.errors.currency && (
              <FormHelperText error>
                {' '}
                {formik.errors.currency}{' '}
              </FormHelperText>
            )}
          </Grid>

          {/* Type */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="type" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Operación
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomSelect
              id="type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              fullWidth>
              <MenuItem value="buy">Compra</MenuItem>
              <MenuItem value="sell">Venta</MenuItem>
              <MenuItem value="dividend">Dividendo</MenuItem>
              <MenuItem value="coupon">Cupón</MenuItem>
              <MenuItem value="amortization">Amortización</MenuItem>
            </CustomSelect>
            {touched.type && formik.errors.type && (
              <FormHelperText error>
                {' '}
                {formik.errors.type}{' '}
              </FormHelperText>
            )}
          </Grid>

          {/* Details */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="details" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Detalle
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
          <CustomTextField
              id="details"
              placeholder="Descripción"
              {...getFieldProps('details')}
              error={Boolean(touched.details && errors.details)}
              helperText={touched.details && errors.details}
              multiline
              fullWidth />
          </Grid>

          {/* Botón de Guardar */}
          <Grid item xs={12} sm={2}></Grid>
          <Grid item xs={12} sm={9}>
            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  )
}

TransactionForm.propTypes = {
  initialValues: PropTypes.shape({
    quantity: PropTypes.number,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default TransactionForm;
