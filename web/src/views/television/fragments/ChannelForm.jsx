import PropTypes from 'prop-types';
import { Grid, MenuItem, Button, FormHelperText, Switch, Typography } from '@mui/material';
import { Form, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import CustomFormLabel from '@app/components/customs/CustomFormLabel';
import CustomTextField from '@app/components/customs/CustomTextField';
import useMounted from '@app/components/guards/UseMounted';
import CustomSelect from '@app/components/customs/CustomSelect';
import { useTranslation } from 'react-i18next';

export const UserForm = ({ initialValues, onSubmit }) => {
  const mounted = useMounted();
  const { t } = useTranslation();
  const ChannelSchema = Yup.object().shape({
    name: Yup.string().required(t('form.validation.name.required')),
    logo: Yup.string().optional(),
    category: Yup.string()
      .required(t('form.validation.category.required'))
      .oneOf(['movies', 'sports', 'news', 'general'], t('form.validation.category.oneOf')),
    number: Yup.number().optional(),
    media_url: Yup.string().required(t('form.validation.media_url.required')),
    plan: Yup.string()
      .required(t('form.validation.plan.required'))
      .oneOf(['basic', 'pro', 'max'], t('form.validation.plan.oneOf')),
    epg_id: Yup.string().optional(),
    drm: Yup.object().shape({
      type: Yup.string().required(t('form.validation.type.required')),
    }),
    enabled: Yup.boolean().optional(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: ChannelSchema,
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
          
          <Grid item xs={12}>
            <Typography variant="subtitle1">Información del canal</Typography>
          </Grid>

          {/* Nombre */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="name" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.name')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              id="name"
              placeholder={t('form.placeholder.name')}
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              fullWidth />
          </Grid>


          {/* EPG name */}
          <Grid item xs={12} sm={1} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="name" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.epg_id')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              id="epg_id"
              name="epg_id"
              placeholder={t('form.placeholder.epg_id')}
              {...getFieldProps('epg_id')}
              error={Boolean(touched.epg_id && errors.epg_id)}
              helperText={touched.epg_id && errors.epg_id}
              fullWidth />
          </Grid>

          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="picture" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.plan')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={4}>
          <CustomSelect
              id="plan"
              name="plan"
              value={formik.values.plan}
              onChange={formik.handleChange}
              fullWidth>
              <MenuItem value="basic">{t('form.values.plan.basic')}</MenuItem>
              <MenuItem value="pro">{t('form.values.plan.pro')}</MenuItem>
              <MenuItem value="max">{t('form.values.plan.max')}</MenuItem>
            </CustomSelect>
            {touched.plan && formik.errors.plan && (
              <FormHelperText error>
                {' '}
                {formik.errors.plan}{' '}
              </FormHelperText>
            )}
          </Grid>

          {/* logo */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="picture" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.logo')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              id="logo"
              placeholder={t('form.placeholder.logo')}
              {...getFieldProps('logo')}
              error={Boolean(touched.logo && errors.logo)}
              helperText={touched.logo && errors.logo}
              fullWidth />
          </Grid>



          {/* number */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="picture" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.number')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              id="number"
              placeholder={t('form.placeholder.number')}
              {...getFieldProps('number')}
              error={Boolean(touched.number && errors.number)}
              helperText={touched.number && errors.number}
              fullWidth />
          </Grid>

          {/* category */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="picture" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.category')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomSelect
              id="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              fullWidth>
              <MenuItem value="movies">{t('form.values.category.movies')}</MenuItem>
              <MenuItem value="sports">{t('form.values.category.sports')}</MenuItem>
              <MenuItem value="news">{t('form.values.category.news')}</MenuItem>
              <MenuItem value="general">{t('form.values.category.general')}</MenuItem>
            </CustomSelect>
            {touched.category && formik.errors.category && (
              <FormHelperText error>
                {' '}
                {formik.errors.category}{' '}
              </FormHelperText>
            )}
          </Grid>

          {/* media */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="picture" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.media_url')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <CustomTextField
              id="media_url"
              placeholder={t('form.placeholder.media_url')}
              {...getFieldProps('media_url')}
              error={Boolean(touched.media_url && errors.media_url)}
              helperText={touched.media_url && errors.media_url}
              fullWidth />
          </Grid>

          {/* enabled */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="picture" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.enabled')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Switch
                name="enabled"
                value={formik.values.enabled}
                onChange={formik.handleChange}
                checked={formik.values.enabled}
              />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Información de DRM</Typography>
          </Grid>

          {/* drm type */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="picture" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.type')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomSelect
              id="type"
              name="drm.type"
              value={formik.values.drm.type}
              onChange={formik.handleChange}
              fullWidth>
              <MenuItem value="">--- Seleccione una opción ---</MenuItem>
              <MenuItem value="widevine">Widevine</MenuItem>
              <MenuItem value="clearkeys">Clear Keys</MenuItem>
            </CustomSelect>
            {touched.drm?.type && formik.errors.drm?.type && (
              <FormHelperText error>
                {' '}
                {formik.errors.drm.type}{' '}
              </FormHelperText>
            )}
          </Grid>

          {/* license url */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="picture" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.licenseUrl')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              id="license_url"
              placeholder={t('form.placeholder.licenseUrl')}
              value={formik.values.drm.license_url}
              onChange={formik.handleChange}
              error={Boolean(touched.license_url && errors.license_url)}
              helperText={touched.license_url && errors.license_url}
              fullWidth />
          </Grid>

          {/* key_id */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="picture" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.keyId')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              id="drm.key_id"
              name="drm.key_id"
              placeholder={t('form.placeholder.keyId')}
              value={formik.values.drm.key_id}
              onChange={formik.handleChange}
              error={Boolean(touched.key_id && errors.key_id)}
              helperText={touched.key_id && errors.key_id}
              fullWidth />
          </Grid>

          {/* key */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="picture" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.key')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              id="drm.key"
              name="drm.key"
              placeholder={t('form.placeholder.key')}
              value={formik.values.drm.key}
              onChange={formik.handleChange}
              error={Boolean(touched.key && errors.key)}
              helperText={touched.key && errors.key}
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

export default UserForm;
