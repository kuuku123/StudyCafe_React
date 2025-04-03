#!/bin/bash

# Base URL for your API
API_GATEWAY_URL="http://localhost:8083"
#API_GATEWAY_URL="https://tonylimtest123.duckdns.org:8083"

# File to store cookies
COOKIE_JAR="cookies.txt"

# JSON payload for the sign-up request
SIGNUP_PAYLOAD='{
  "nickname": "test",
  "email": "test@example.com",
  "password": "1234"
}'

# Create account; the server will send the JWT in a cookie.
account_response=$(curl -s -X POST "$API_GATEWAY_URL/auth/sign-up" \
  -H "Content-Type: application/json" \
  -c "$COOKIE_JAR" \
  -d "$SIGNUP_PAYLOAD")

echo "Account creation response: $account_response"

# Function to encode an image file to Base64, returns empty string if file is not found.
encode_image() {
  local file="$1"
  if [[ -f "$file" ]]; then
    base64 "$file" | tr -d '\n'
  else
    echo ""
  fi
}

declare -a STUDY_PATHS=("health" "computer-science" "mathematics" "physics" "biology" "chemistry" "literature" "history" "economics" "psychology" "engineering")
declare -a STUDY_TITLES=("Health" "Computer Science" "Mathematics" "Physics" "Biology" "Chemistry" "Literature" "History" "Economics" "Psychology" "Engineering")
declare -a STUDY_SHORT_DESCRIPTIONS=(
  "A brief overview of Health"
  "A brief overview of Computer Science"
  "A brief overview of Mathematics"
  "A brief overview of Physics"
  "A brief overview of Biology"
  "A brief overview of Chemistry"
  "A brief overview of Literature"
  "A brief overview of History"
  "A brief overview of Economics"
  "A brief overview of Psychology"
  "A brief overview of Engineering"
)
declare -a STUDY_FULL_DESCRIPTIONS=(
  "Detailed description about Health."
  "Detailed description about Computer Science."
  "Detailed description about Mathematics."
  "Detailed description about Physics."
  "Detailed description about Biology."
  "Detailed description about Chemistry."
  "Detailed description about Literature."
  "Detailed description about History."
  "Detailed description about Economics."
  "Detailed description about Psychology."
  "Detailed description about Engineering."
)
declare -a STUDY_FULL_TEXTS=(
  "Plain text description about Health."
  "Plain text description about Computer Science."
  "Plain text description about Mathematics."
  "Plain text description about Physics."
  "Plain text description about Biology."
  "Plain text description about Chemistry."
  "Plain text description about Literature."
  "Plain text description about History."
  "Plain text description about Economics."
  "Plain text description about Psychology."
  "Plain text description about Engineering."
)
declare -a STUDY_IMAGE_FILES=("health.jpg" "cs.jpg" "math.jpg" "physics.jpg" "biology.jpg" "chemistry.jpg" "literature.jpg" "history.jpg" "economics.jpg" "psychology.jpg" "engineering.jpg")





NUM_STUDIES=${#STUDY_PATHS[@]}

# Loop over each study and create it using the API
for (( i=0; i<NUM_STUDIES; i++ )); do
  # Encode image if available. If the file doesn't exist, this will be an empty string.
  STUDY_IMAGE=$(encode_image "${STUDY_IMAGE_FILES[$i]}")
  
  # Construct the JSON payload.
  # If you don't want to send studyImage when empty, you might add logic to omit it.
  JSON_PAYLOAD=$(cat <<EOF
{
  "path": "${STUDY_PATHS[$i]}",
  "title": "${STUDY_TITLES[$i]}",
  "shortDescription": "${STUDY_SHORT_DESCRIPTIONS[$i]}",
  "fullDescription": "${STUDY_FULL_DESCRIPTIONS[$i]}",
  "fullDescriptionText": "${STUDY_FULL_TEXTS[$i]}",
  "studyImage": "$STUDY_IMAGE"
}
EOF
)
  
  echo "Creating study: ${STUDY_PATHS[$i]}"
  response=$(curl -s -X POST "$API_GATEWAY_URL/app/new-study" \
    -H "Content-Type: application/json; charset=utf-8" \
    -b "$COOKIE_JAR" \
    -d "$JSON_PAYLOAD")
    
  echo "Response: $response"
  echo "------------------------------------------"
done

# Now, loop over each study and publish it.
for (( i=0; i<NUM_STUDIES; i++ )); do
  study_path="${STUDY_PATHS[$i]}"
  echo "Publishing study: $study_path"
  publish_response=$(curl -s -X POST "$API_GATEWAY_URL/app/study/$study_path/settings/publish" \
    -H "Content-Type: application/json; charset=utf-8" \
    -b "$COOKIE_JAR")

  echo "Publish response: $publish_response"
  echo "------------------------------------------"
done

# Loop over each study and add a tag (using the study path as the tag).
for (( i=0; i<NUM_STUDIES; i++ )); do
  study_path="${STUDY_PATHS[$i]}"
  echo "Adding tag '$study_path' to study: $study_path"
  
  # Construct the JSON payload for the tag. Adjust the key name if your TagForm expects a different field.
  TAG_PAYLOAD=$(cat <<EOF
[
  {"title": "$study_path"}
]
EOF
)
  
  tag_response=$(curl -s -X POST "$API_GATEWAY_URL/app/study/$study_path/settings/tags/add" \
    -H "Content-Type: application/json; charset=utf-8" \
    -b "$COOKIE_JAR" \
    -d "$TAG_PAYLOAD")
  
  echo "Tag response: $tag_response"
  echo "------------------------------------------"
done

# Optionally, clean up by removing the cookie jar file
rm -f "$COOKIE_JAR"

