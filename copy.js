window.COPY = {
 brand:{name:'건망증과 동거중',englishName:'Forget Me Yes',projectName:'forget-me-yes',tagline:'잊어도 괜찮은 하루를 만듭니다.',get headline(){return this.tagline;},description:'장소별 준비물, 중요한 물건 위치\n가볍게 기록하고 체크해요.',get footer(){return this.tagline;},cat:'편안히 누워 쉬는 고양이'},
 nav:{home:'홈',packing:'장소별 준비물',locations:'중요한 물건 위치',mobilePacking:'준비물',mobileLocations:'물건 위치',toggle:'카테고리 접기/펼치기'},
 home:{input:'어디 가세요? 준비물을 말하거나 입력하세요',recent:'최근 사용 카테고리',example:'예) 수영장 카테고리 만들고 기본 준비물 세팅해줘\n기본 목록: 수영장 · 여행 · 등산 · 헬스장 · 캠핑 · 출장',moreExamples:'명령어 예시 더 보기',commandExamples:[{label:'직접 추가',text:'수영장에 수영 모자, 수영 안경 추가해줘'},{label:'카테고리 이름 수정',text:'수영장 카테고리를 실내 수영으로 바꿔줘'},{label:'카테고리 삭제',text:'수영장 카테고리 삭제해줘'}],commandHint:'여러 준비물은 쉼표로 구분해요. 음성에서는 “쉼표”라고 말해주세요.',deleteHint:'수정·삭제는 확인 후 적용되며, 카테고리를 삭제하면 안의 준비물도 함께 삭제됩니다.'},
 packing:{headline:'필요한 것만 딱딱 챙겨요.',description:'자주 가는 곳은 미리 만들어두고,\n갈 때마다 체크해요.',input:'준비물을 말하거나 입력하세요.',empty:'아직 준비물이 없어요.\n말하거나 입력해서 하나씩 채워보세요.',emptyCategories:'아직 카테고리가 없어요.',done:'완료',shared:'모든 외출 기본템',sharedHint:'여기서 수정한 기본템은 모든 장소에 반영돼요.',group:'준비물 카테고리',import:'다른 장소에서 카테고리 가져오기',pickImport:'가져올 카테고리를 골라주세요.',importEmpty:'가져올 카테고리가 없어요.'},
 itemLocation:{headline:'나갈 때 필요한 건 척척,\n들어올 때 제자리에 탁탁!',description:'중요한 물건의 자리를 기록해두고\n필요할 때 바로 찾아요.',input:'어디 뒀는지 말하거나 입력하세요.',empty:'아직 기록한 물건이 없어요.\n생각난 김에 하나 남겨볼까요?',name:'물건 이름',location:'보관 위치',category:'카테고리',memo:'메모 (선택)',updated:'수정일',example:'예) 여권 안방 옷장 위칸'},
 buttons:{addCategory:'카테고리 추가',newCategory:'새 카테고리 만들기',addItem:'항목 추가',addObject:'새 물건 추가',edit:'수정',remove:'삭제',cancel:'취소',save:'저장하기',reset:'전체 체크 해제',all:'전체',allCategories:'전체보기',close:'닫기',submit:'입력',mic:'음성 입력',stop:'음성 입력 중지',up:'위로 이동',down:'아래로 이동',back:'목록으로',addGroup:'준비물 카테고리 추가',import:'가져오기'},
 editor:{editChoose:'어느 장소의 준비물을 수정할까요?',commandEdit:'준비물 이름 수정',renamePreview:'아래 이름으로 수정할까요?',invalidEdit:'수정·삭제 대상을 확인하지 못했어요. 예: 장갑을 방수 장갑으로 바꿔줘 / 장갑 삭제해줘',ambiguousEdit:'같은 이름의 항목이 여러 개예요. 해당 항목의 수정 버튼을 눌러주세요.',emptyOwn:'이 장소에 따로 등록한 준비물이 없어요. 모든 외출 기본템은 유지돼요.',keepCommon:'이 장소의 준비물만 삭제돼요. 모든 외출 기본템과 다른 장소의 목록은 유지돼요.',deleteChoose:'어느 장소에서 삭제할까요?',deleteTargets:'아래 준비물을 삭제할까요?',notFound:'일치하는 준비물을 찾지 못했어요. 목록에 적힌 이름으로 말하거나 입력해주세요.',unmatched:'찾지 못한 이름 (삭제되지 않아요):',deleteCommon:'모든 외출 기본템은 다른 장소에서도 함께 삭제됩니다.',categoryName:'카테고리 이름',itemName:'준비물 이름',icon:'아이콘 선택',color:'대표 색상 선택',editCategory:'카테고리 수정',editItem:'준비물 수정',editObject:'물건 위치 수정',newObject:'물건 위치 추가',choose:'어느 카테고리에 추가할까요?',confirm:'삭제 확인',deleteCategory:'카테고리 안의 준비물까지 모두 삭제됩니다.',deleteObjectCategory:'카테고리 안의 물건과 위치 기록까지 모두 삭제됩니다.',deleteItem:'이 항목을 삭제할까요?',reset:'이 장소의 체크 표시를 모두 해제할까요?',required:'내용을 입력해주세요.',duplicate:'같은 이름의 카테고리가 이미 있어요.',sharedDelete:'모든 장소에서 이 기본템이 삭제됩니다.',categoryHint:'예: 여행, 등산, 출장',objectCategory:'물건 카테고리 추가'},
 messages:{saved:'저장했어요.',removed:'삭제했어요.',added:'추가했어요.',reset:'체크를 모두 해제했어요.',storage:'저장하지 못했어요. 브라우저 저장 공간을 확인해주세요.',corrupt:'저장된 데이터를 읽지 못했어요. 원본은 보존했어요.',unsupported:'이 브라우저는 음성 입력을 지원하지 않아요. 글로 입력해주세요.',listening:'듣고 있어요. 말씀해주세요.',voiceDenied:'브라우저의 마이크 접근이 차단됐어요. 사이트 마이크 권한을 허용한 뒤 다시 시도해주세요.',voiceUnavailable:'이 브라우저에서 음성 인식 서비스에 접근할 수 없어요. Chrome 또는 Edge에서 같은 주소를 열어주세요.',voiceNetwork:'음성 인식 서비스에 연결하지 못했어요. 인터넷 연결을 확인하거나 Chrome 또는 Edge에서 시도해주세요.',voiceCapture:'마이크 입력을 받지 못했어요. 연결된 마이크와 운영체제의 마이크 권한을 확인해주세요.',voiceLanguage:'이 브라우저의 음성 인식에서 한국어를 사용할 수 없어요.',voiceError:'음성을 받지 못했어요. 마이크 권한을 확인하거나 글로 입력해주세요.',noSpeech:'인식한 내용이 없어요. 다시 말하거나 입력해주세요.',nothing:'추가할 준비물을 입력해주세요.',chooseLocation:'물건 이름과 위치를 확인해주세요.',duplicateItem:'이미 있는 준비물은 제외했어요.',moved:'순서를 변경했어요.'},
 defaults:{places:['논산 본원행','여행','등산','외출'],locationCategories:['자주 쓰는 필수품','전자기기','귀중품','서류','기타'],common:['핸드폰','카드','키','화장품 파우치','치약치솔세트','블루투스 이어폰','책'],placeItems:{'논산 본원행':['명찰 꼭!!!','세면도구','물병','다이어리','속옷','수건'],'등산':['스틱','먹거리','여분양말','여분속옷','선글라스','모자','바람막이','장갑','가재수건','벌레퇴치제','선크림'],'여행':['옷','세면도구','책','카메라','여권','신분증']},base:'기본템'},
 packingTemplates:[
  {aliases:['수영장','수영'],icon:'water',groups:{'수영용품':['수영복','수영모','수경'],'세면도구':['샴푸','바디워시','폼클렌징','수건'],'갈아입을 것':['속옷','여분 옷','젖은 옷 담을 봉투']}},
  {aliases:['여행','국내여행','해외여행'],icon:'plane',groups:{'옷가지':['바지','상의','속옷','양말'],'세면도구':['샴푸','바디워시','폼클렌징','샤워타올','트리트먼트'],'여행용품':['신분증','충전기','보조 배터리']}},
  {aliases:['등산','산행'],icon:'mountain',groups:{'등산용품':['등산화','스틱','배낭'],'옷가지':['바람막이','모자','장갑','여분양말'],'먹거리':['물병','간식'],'기타':['선크림','벌레퇴치제','작은 구급키트']}},
  {aliases:['헬스장','헬스','운동'],icon:'bag',groups:{'운동용품':['운동복','운동화','물병'],'세면도구':['수건','샴푸','바디워시'],'갈아입을 것':['속옷','양말','여분 옷']}},
  {name:'캠핑',aliases:['캠핑','캠프'],icon:'tent',groups:{'숙박':['텐트','침낭','매트','랜턴'],'식사':['버너','연료','코펠','식기','먹거리','마실 물'],'생활':['여벌 옷','세면도구','수건','휴지','쓰레기봉투'],'안전':['구급키트','벌레퇴치제','선크림']}},
  {aliases:['출장'],icon:'case',groups:{'업무용품':['노트북','노트북 충전기','휴대폰 충전기','보조 배터리','필기구'],'서류':['신분증','명함','업무 자료'],'옷가지':['업무용 옷','속옷','양말','여분 옷'],'세면도구':['샴푸','바디워시','수건']}}
 ],
 travelGroups:{'옷가지':['바지','상의','속옷','양말'],'세면도구':['샴푸','바디워시','폼클렌징','샤워타올','트리트먼트']},
 locationSamples:[
  {name:'카드',location:'현관 문앞 신발장 위',category:'자주 쓰는 필수품'},
  {name:'핸드폰',location:'침대 헤드',category:'자주 쓰는 필수품'},
  {name:'안경',location:'침대헤드',category:'자주 쓰는 필수품'},
  {name:'리모컨',location:'침대헤드',category:'자주 쓰는 필수품'},
  {name:'백금 목걸이',location:'악세서리함 3번째 서랍',category:'귀중품'},
  {name:'계약서 1',location:'2단 책장 좌측부',category:'서류'},
  {name:'학습자료 1',location:'책상 옆 책장 세번째 칸',category:'서류'}
 ],
 icons:{bag:'가방',plane:'여행',mountain:'등산',shopping:'외출',case:'출장',tent:'캠핑',water:'수영',home:'집',pin:'위치',key:'열쇠',heart:'생활',book:'책'}
};
// 브랜드 표기는 COPY.brand에서 관리합니다. 기존 저장소 키는 기록 보존을 위해 유지합니다.
document.title = window.COPY.brand.name + ' | ' + window.COPY.brand.englishName;
