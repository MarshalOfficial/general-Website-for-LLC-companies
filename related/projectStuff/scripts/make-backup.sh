fname="DBbak-$(date +"%Y-%m-%d-%T")"
fpath="healight/healight.green/backups/db"
wait
mkdir ~/$fpath/$fname
wait
mongodump --host localhost:27017 -d health -u mlibre -p "M17511752gh*M17511752gh" -o ~/$fpath/$fname
