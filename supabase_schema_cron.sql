-- Enable the pg_cron extension
create extension if not exists pg_cron with schema extensions;

-- Grant usage on the cron schema
grant usage on schema cron to postgres;
grant all privileges on all tables in schema cron to postgres;

-- Schedule a job to run every day at 00:00 (Midnight)
-- This executes a simple 'SELECT 1' query to keep the database active
select cron.schedule(
  'keep-alive', -- Job name
  '0 0 * * *',  -- Cron schedule (Daily at midnight)
  'select 1'    -- SQL command to execute
);

-- Optional: Verify the scheduled job
-- select * from cron.job;
