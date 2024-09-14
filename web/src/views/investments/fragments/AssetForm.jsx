import PropTypes from 'prop-types';
import { Grid, MenuItem, Button, FormHelperText } from '@mui/material';
import { Form, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import CustomFormLabel from '@app/components/customs/CustomFormLabel';
import CustomTextField from '@app/components/customs/CustomTextField';
import CustomSelect from '@app/components/customs/CustomSelect';
import useMounted from '@app/components/guards/UseMounted';
import { useTranslation } from 'react-i18next';

export const AssetForm = ({ initialValues, onSubmit }) => {
  const mounted = useMounted();
  const { t } = useTranslation();
  const AssetSchema = Yup.object().shape({
    asset_name: Yup.string().required(t('form.validation.name.required')),
    symbol: Yup.string().required(t('form.validation.symbol.required')),
    asset_type: Yup.string().required(t('form.validation.type.required')),
    market: Yup.string().required(t('form.validation.market.required')),
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
            {t('form.fields.name')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <CustomTextField
              id="asset-name"
              placeholder={t('form.placeholder.name')}
              {...getFieldProps('asset_name')}
              error={Boolean(touched.asset_name && errors.asset_name)}
              helperText={touched.asset_name && errors.asset_name}
              fullWidth />
          </Grid>

          {/* Símbolo */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="asset-symbol" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.symbol')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              id="asset-symbol"
              placeholder={t('form.placeholder.symbol')}
              {...getFieldProps('symbol')}
              error={Boolean(touched.symbol && errors.symbol)}
              helperText={touched.symbol && errors.symbol}
              fullWidth />
          </Grid>

          {/* Tipo */}
          <Grid item xs={12} sm={1} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="asset-type" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.type')}
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
              <MenuItem value="foreign-stock">Acción del exterior</MenuItem>
              <MenuItem value="local-stock">Acción local</MenuItem>
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
            {t('form.fields.market')}
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
            {t('form.fields.ratio')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              id="asset-ratio"
              placeholder={t('form.placeholder.ratio')}
              {...getFieldProps('ratio')}
              error={Boolean(touched.ratio && errors.ratio)}
              helperText={touched.ratio && errors.ratio}
              fullWidth
            />
          </Grid>

          {/* Icono */}
          <Grid item xs={12} sm={1} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="asset-icon" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.icon')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              id="asset-icon"
              placeholder={t('form.placeholder.icon')}
              {...getFieldProps('icon')}
              error={Boolean(touched.icon && errors.icon)}
              helperText={touched.icon && errors.icon}
              fullWidth />
          </Grid>

          {/* Descripción */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="asset-description" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.description')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <CustomTextField
              id="asset-description"
              placeholder={t('form.placeholder.description')}
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
            {t('form.save')}
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
