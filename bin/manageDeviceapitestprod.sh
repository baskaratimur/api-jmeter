dateTime=$(date +"%d%m%Y%H%M%S")
folderName=manageDevice_$(date +"%d%m%Y")
cd "/home/ubuntu/apache-jmeter-5.5/html"
# cd "$folderName"
# mkdir "$dateTime"
if [ -d "$folderName" ]; then
  echo "Directory already exists. Changing to the existing directory..."
  cd "$folderName"
else
  echo "Directory does not exist. Creating the directory..."
  mkdir "$folderName"
  cd "$folderName"
fi 
mkdir "$dateTime"
cd "/home/ubuntu/apache-jmeter-5.5/bin"
./jmeter -n -t manageDevice-loadtest.jmx -l /home/ubuntu/apache-jmeter-5.5/report/"$dateTime".jtl -e -o /home/ubuntu/apache-jmeter-5.5/html/"$folderName"/"$dateTime"