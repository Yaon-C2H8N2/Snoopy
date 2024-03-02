# Data Directory

This directory, is used as a mount point for the database container.

## Why do we use this?

When running a database inside a container, the data stored in the database needs to persist across container restarts and removals. Binding the data directory to a directory on the host machine allows persistence of the data. Safer to me than to use a docker managed volume.

Please do not manually modify or delete files in this directory, as it could lead to data loss or corruption.