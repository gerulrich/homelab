import PropTypes from 'prop-types';
import { Grid, MenuItem, Button, FormHelperText } from '@mui/material';
import { Form, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import CustomFormLabel from '@app/components/customs/CustomFormLabel';
import CustomTextField from '@app/components/customs/CustomTextField';
import CustomSelect from '@app/components/customs/CustomSelect';
import useMounted from '@app/components/guards/UseMounted';

export const AssetForm = ({ initialValues, onSubmit }) => {
  const mounted = useMounted();
  const AssetSchema = Yup.object().shape({
    asset_name: Yup.string().required('Name is required'),
    symbol: Yup.string().required('Symbol is required'),
    asset_type: Yup.string().required('Type is required'),
    market: Yup.string().required('Market is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: AssetSchema,
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
          
          {/* Nombre */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="asset-name" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Nombre
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <CustomTextField
              id="asset-name"
              placeholder="Nombre del activo"
              {...getFieldProps('asset_name')}
              error={Boolean(touched.asset_name && errors.asset_name)}
              helperText={touched.asset_name && errors.asset_name}
              fullWidth />
          </Grid>

          {/* Símbolo */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="asset-symbol" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Símbolo
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              id="asset-symbol"
              placeholder="Símbolo del activo"
              {...getFieldProps('symbol')}
              error={Boolean(touched.symbol && errors.symbol)}
              helperText={touched.symbol && errors.symbol}
              fullWidth />
          </Grid>

          {/* Tipo */}
          <Grid item xs={12} sm={1} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="asset-type" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Tipo
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={2}>
            <CustomSelect
              id="asset_type"
              name="asset_type"
              value={formik.values.asset_type}
              onChange={formik.handleChange}
              fullWidth>
              <MenuItem value="cedear">Cedear</MenuItem>
              <MenuItem value="cedear-etf">Cedear (ETF)</MenuItem>
              <MenuItem value="bono">Bono</MenuItem>
              <MenuItem value="on">ON</MenuItem>
              <MenuItem value="foreign">Extranjero</MenuItem>
            </CustomSelect>
            {touched.asset_type && formik.errors.asset_type && (
              <FormHelperText error>
                {' '}
                {formik.errors.asset_type}{' '}
              </FormHelperText>
            )}
          </Grid>

          {/* Mercado */}
          <Grid item xs={12} sm={1} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="asset-market" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Mercado
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomSelect
              id="market"
              name="market"
              value={formik.values.market}
              onChange={formik.handleChange}
              fullWidth>
              <MenuItem value="BCBA">BCBA</MenuItem>
              <MenuItem value="NYSE">NYSE</MenuItem>
              <MenuItem value="NASDAQ">NASDAQ</MenuItem>
            </CustomSelect>
            {touched.market && formik.errors.market && (
              <FormHelperText error id="standard-weight-helper-text-email-login">
                {' '}
                {formik.errors.market}{' '}
              </FormHelperText>
            )}
          </Grid>

          {/* Ratio */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="asset-ratio" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Ratio
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              id="asset-ratio"
              placeholder="Ratio del activo"
              {...getFieldProps('ratio')}
              error={Boolean(touched.ratio && errors.ratio)}
              helperText={touched.ratio && errors.ratio}
              fullWidth
            />
          </Grid>

          {/* Icono */}
          <Grid item xs={12} sm={1} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="asset-icon" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Icono
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              id="asset-icon"
              placeholder="URL del icono"
              {...getFieldProps('icon')}
              error={Boolean(touched.icon && errors.icon)}
              helperText={touched.icon && errors.icon}
              fullWidth />
          </Grid>

          {/* Descripción */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="asset-description" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
              Descripción
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <CustomTextField
              id="asset-description"
              placeholder="Descripción del activo"
              {...getFieldProps('description')}
              error={Boolean(touched.description && errors.description)}
              helperText={touched.description && errors.description}
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

AssetForm.propTypes = {
  initialValues: PropTypes.shape({
    asset_name: PropTypes.string,
    symbol: PropTypes.string,
    asset_type: PropTypes.string,
    market: PropTypes.string,
    icon: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default AssetForm;
