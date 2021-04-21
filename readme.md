## 共通項目？
### Headers
* Hostがflabulessの場合
    * User-Agent: "BenefitSt%20Fit/85 CFNetwork/1209 Darwin/20.2.0" 
    * Accept: "application/json"
    * Authorization: "Token 6f504e4b80092279148d02239960c6f3e53b0d7d"
    （更新タイミングは？発行元は？）

## 各API情報

### 開発者設定？
* Host
    * live.actxa.com
* Path
    * /ext/getDeveloperSettings HTTP/1.1
* Method
    * POST
* Body
    * {
        "application":{"clientID":"NbSsX7crgS"},
        "isProduction":"true"
      }

### 認証トークン（送信時のTokenとは異なる？）
* Header
:method	POST
:scheme	https
:path	/v1/projects/benefitst-223822/installations/e6u9pws4q0qhjILxRYrJDp/authTokens:generate
:authority	firebaseinstallations.googleapis.com
content-type	application/json
accept	*/*
x-firebase-client	apple-sdk/17F65 fire-analytics/6.3.0 fire-install/1.1.0 fire-ios/6.6.3 swift/true xcode/11E608c
authorization	FIS_v2 2_K55qTEp5kH3Hp5GzxkaNFjWCJQ7zbnXcI-S81ALd-sh5WTTM3mU-sWz-sAlWK--x
x-firebase-client-log-type	3
x-ios-bundle-identifier	com.rewardz.benefitstfit
accept-encoding	gzip, deflate, br
x-goog-api-key	AIzaSyDv5zK4YBYE5v9HcaB6B9fWIsjLqxVk8-c
accept-language	ja-jp
content-length	41
user-agent	BenefitSt%20Fit/85 CFNetwork/1209 Darwin/20.2.0

* Host
    * firebaseinstallations.googleapis.com
* Path
    * m/v1/projects/benefitst-223822/installations/e6u9pws4q0qhjILxRYrJDp/authTokens:generate
* Method
    * POST
* Body
    * {"installation":{"sdkVersion":"i:1.1.0"}}

### api-token認証
* Header
    * Content-Type
        * application/x-www-form-urlencoded
* Host
    * flabuless.ne.jp
* Path
    * /v8/api-token-auth/ HTTP/1.1
* Method
    * POST
* Body
    * username=t-okawa@cresco.co.jp&password=Takapiro1158&has_mobile_data=1&registration_id=E35A10AF51A452B0748DC96CFBA35391786902F9BC686C78F2101ABF6B2CFA58&device_id=4EFFE9F3-D10E-4892-9F12-9676A2E8F5AA&device_type=iOS
* Response
{
	"allow_chat_with_expert": false,
	"profile_pic": "/static/dashboard/images/user_icon.png",
	"last_name": "\u8cb4\u5e83",
	"challenge_slug": "",
	"allow_user_event_creation": false,
	"is_default_password": false,
	"has_connected_tracker": false,
	"show_rewardz": true,
	"first_name": "\u5927\u5ddd",
	"employee_id": "119464002015005",
	"manual_capture_enabled": true,
	"tracker": "applehealth",
	"pk": 1653,
	"logo_url": "/static/images/logo.png",
	"facility_checkin_enabled": true,
	"phone_number": "0",
	"show_healthstats_onboarding": false,
	"team": "\u672c\u793e",
	"is_active": true,
	"chat_key": null,
	"has_challenges": false,
	"directory_listings": {
		"basepath": "/v/directory_listings/",
		"details": []
	},
	"display_activity_trackers": false,
	"challenge_type": "",
	"show_healthstats_form": false,
	"hides_connected_apps": false,
	"email": "t-okawa@cresco.co.jp",
	"token": "34dfb005b985198846d91e93fdb6442ca0b0f811",  // これがAPI Token
	"max_points_per_activity": 200.0,
	"organization": "\u682a\u5f0f\u4f1a\u793e\u3000\u30af\u30ec\u30b9\u30b3"
}


### Tokenチェック
* URL
    * xp8jwcfqkf.execute-api.us-east-1.amazonaws.com/prod/error HTTP/1.1
* Method
    * POST

### 歩数送信
* Host
    * flabuless.ne.jp
* Path
    * /v8/steps-bulk/? HTTP/1.1
* Method
    * POST
* Body
{
  "steplist" : [
    {
      "total_calories" : "0",
      "duration" : "0",
      "start_time" : "2021-04-17 00:00:00+0900",
      "total_distance" : "332",
      "steps" : "550"
    }
  ]
}


### 活動記録
* Host
    * flabuless.ne.jp
* Path
    * /v8/activities/ HTTP/1.1
* Method
    * POST 
* Body
    * source: string
        * manual,
    * activity_type: string
        * three_meals           // 3食記録
        * sleep_six_hours       // 6時間睡眠
        * relax                 // リラックス
        * thermometry           // 体温
        * staggered_work        // 3密回避
        * hand_washing_gargle   // 手洗いうがい
        * self_restraint        // 不要不急の外出
    * start_time: string
        * "2021-04-17T17:10:00+09:00"
    * raw_activity_type: string 
        * "音楽" （activity_type: "relax"時のみ ）

{"start_time":"2021-04-15T17:39:00+09:00","raw_activity_type":"音楽","source":"manual","activity_type":"relax"}

### 合計ポイント取得
* Header
    * Content-Type
        * application/x-www-form-urlencoded
* Host
    * flabuless.ne.jp
* Path
    * /v8/total-points/ HTTP/1.1
* Method
    * POST
* Body
    * date=

### サービス取得
* Host
    * flabuless.ne.jp
* Path
    * /v8/services/ HTTP/1.1
* Method
    * GET


### テンプレート
* Host
    * 
* Path
    * 
* Method
    * 
* Body
