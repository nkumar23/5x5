# Airtable Setup for Email Subscriptions

This document explains how to set up Airtable integration for the `/subscribe` route email collection.

## Airtable Base Setup

1. **Create a new Airtable base** or use an existing one
2. **Create a table** called "Subscribers" (or your preferred name)
3. **Set up columns**:
   - `Id` (Primary field, auto-generated)
   - `Email` (Single line text field)

## API Configuration

1. **Get your Base ID**:
   - Go to [Airtable API documentation](https://airtable.com/api)
   - Select your base
   - Find the Base ID in the URL or documentation (starts with `app`)

2. **Create a Personal Access Token**:
   - Go to [Airtable Tokens](https://airtable.com/create/tokens)
   - Click "Create new token"
   - Give it a name (e.g., "5x5 Website Subscriptions")
   - Add the following scopes:
     - `data.records:write` (to create new records)
   - Select your base under "Access"
   - Copy the generated token (starts with `pat`)

## Environment Variables

1. **Copy the example file**:
   ```bash
   cp .env.local.example .env.local
   ```

2. **Fill in your values**:
   ```env
   NEXT_PUBLIC_AIRTABLE_BASE_ID=your_actual_base_id
   NEXT_PUBLIC_AIRTABLE_TABLE_NAME=Subscribers
   NEXT_PUBLIC_AIRTABLE_API_KEY=your_actual_api_token
   ```

## Testing

1. Visit `/subscribe` on your website
2. Enter an email address and submit
3. Check your Airtable base to confirm the record was created
4. Check browser console for any error messages

## Security Notes

- The API key is exposed client-side (NEXT_PUBLIC_*), which is necessary for direct API calls
- Consider implementing rate limiting or additional validation on the server side for production
- Monitor your Airtable API usage to stay within limits

## Troubleshooting

- **403 Forbidden**: Check that your API token has the correct permissions
- **404 Not Found**: Verify your Base ID and Table Name are correct
- **422 Unprocessable Entity**: Check that your table has an "Email" field
- **Network errors**: Ensure CORS is properly configured (Airtable API should allow browser requests)
