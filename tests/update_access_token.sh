#!/bin/bash

# 用户别名
ALIAS="gpts-now"

# 函数：续期用户
renew_user() {
    jike-cli user renew -u "$ALIAS"
}

# 函数：获取 AccessToken
get_access_token() {
    jike-cli user info -u "$ALIAS" -r | grep -o '"accessToken":"[^"]*' | grep -o '[^"]*$' | tr -d '\n'
}

# 函数：获取 RefreshToken
get_refresh_token() {
    jike-cli user info -u "$ALIAS" -r | grep -o '"refreshToken":"[^"]*' | grep -o '[^"]*$' | tr -d '\n'
}

# 函数：替换 accessToken
replace_access_token() {
    local access_token=$1
    sed -i '' -e "s/'accessToken': '.*'/'accessToken': '$access_token'/" config.ts

    # 检查 sed 替换是否成功
    if [ $? -eq 0 ]; then
        echo "accessToken 替换成功"
    else
        echo "accessToken 替换失败"
        exit 1
    fi
}

# 函数：替换 refreshToken
replace_refresh_token() {
    local refresh_token=$1
    sed -i '' -e "s/refreshToken = '.*'/refreshToken = '$refresh_token'/" config.ts

    # 检查 sed 替换是否成功
    if [ $? -eq 0 ]; then
        echo "refreshToken 替换成功"
    else
        echo "refreshToken 替换失败"
        exit 1
    fi
}

# 续期用户
renew_user

# 获取 AccessToken
ACCESS_TOKEN=$(get_access_token)

# 获取 RefreshToken
REFRESH_TOKEN=$(get_refresh_token)

# 打印 ACCESS_TOKEN 和 REFRESH_TOKEN
echo "ACCESS_TOKEN: $ACCESS_TOKEN"
echo "REFRESH_TOKEN: $REFRESH_TOKEN"

# 替换 config.ts 中的 accessToken 和 refreshToken
replace_access_token "$ACCESS_TOKEN"
replace_refresh_token "$REFRESH_TOKEN"
