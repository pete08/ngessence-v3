#!/bin/bash
hello () {
    echo "hello All! \ndope shit!
    \nthis is a new freaky deeky line!
    \nthis is a new freaky deeky line!
    \nthis is a new freaky deeky line!"
}

getit () {
#!/bin/bash

# Specify the path to the file within your React app
file_path="src/data/16s_426-read-1.fastq"

# Check if the file exists
if [ -f "$file_path" ]; then
  # Read the contents of the file and print it
  cat "$file_path" | head -n 25
else
  # If the file doesn't exist, print an error message
  echo "File not found: $file_path"
  exit 1
fi

}

# hello

getit

#Start Here:
# 1. find out how to run a more complex bash shell script
# 2. Can Hannah demo how bbmap works; Noting:
    # 2a. input file(s)
    # 2b. shell scripts (e.g. bbmap/...sh files)
    # 2c. full output and output type
# 3. Use an outside data source as a variable input when for bash shell script 
# 4. Use a state value (e.g. state.id or state.id.datacontents) as an input for bash shell script
# 5. Save output from bash shell script into state data (e.g. state.id.output)