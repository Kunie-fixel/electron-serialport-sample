import * as iconv from "iconv-lite";

const width_length = 38; // BillPrinter는 42가 맞다

// 편집에 사용되는 상수들
const ls_linefeed = "\x0A";
const ls_init = "\x1B" + "@";
const ls_logo = "\x1C\x70\x01\x30" + ls_linefeed;
const ls_Left = "\x1B" + "a" + "0";
const ls_Center = "\x1B" + "a" + "1";
// const ls_Right = "\x1B" + "a" + "2";
const ls_cut = "\x1B\x69";
const ls_size1 = "\x1D" + "!" + "\x11";
const ls_size2 = "\x1D" + "!" + "\x22";
const ls_size3 = "\x1D" + "!" + "\x33";
const ls_size4 = "\x1D" + "!" + "\x44";
const ls_size5 = "\x1D" + "!" + "\x55";
// const ls_size6 = "\x1D" + "!" + "\x66";
const ls_double = "\x1B" + "!" + "\x10";
// const ls_double2 = "\x1B" + "!" + "\x20";
const ls_double3 = "\x1B" + "!" + "\x30";
const ls_normal = "\x1B" + "!" + "\x08" + "\x1B" + "E" + "\x00";
// const ls_smooth_true = "\x1D" + "b" + "\x01"; // 부드럽게 설정
// const ls_smooth_false = "\x1D" + "b" + "\x00"; // 부드럽게 해제
// const ls_bold = "\x1D" + "1" + "\x80";
// const width_length = 38; // BillPrinter는 42가 맞다

function getInit() {
  return ls_init;
}

function getLineSpace() {
  return ls_linefeed;
}

function getCut() {
  const ls_prnbuf =
    ls_linefeed +
    ls_linefeed +
    ls_linefeed +
    ls_linefeed +
    ls_linefeed +
    ls_cut;

  return ls_prnbuf;
}

function getDivideString(value: string, widthLength: number, align: string) {
  let eucKrEncoded = iconv.encode(value, "korean").toString("binary");
  let centerPadding = "";

  for (let divide = 0; divide < widthLength - eucKrEncoded.length; divide++) {
    centerPadding += " ";
  }

  if (align !== "NOT") {
    if (align === "LEFT") {
      eucKrEncoded = centerPadding + eucKrEncoded;
    } else {
      eucKrEncoded = eucKrEncoded + centerPadding;
    }
  }

  return eucKrEncoded;
}

export function getBillPrintTestContent() {
  const COMPANY_NAME = "레플";
  let printContent = getInit();

  printContent += getLineSpace();
  printContent += ls_Left + ls_logo + ls_linefeed;
  printContent +=
    ls_double3 + ls_Center + getDivideString(`응모권`, 38, "NOT") + ls_linefeed;
  printContent += getLineSpace();
  printContent +=
    ls_Center +
    ls_double +
    getDivideString(`키오스크로 정산하신 분들에게`, 38, "NOT") +
    ls_linefeed;
  printContent += getLineSpace();
  printContent +=
    ls_Center +
    ls_double +
    getDivideString(`발급되는 응모권입니다.`, 38, "NOT") +
    ls_linefeed;
  printContent += getLineSpace();
  printContent +=
    ls_Center +
    getDivideString(`추첨을 통해 푸짐한 상품을 드립니다.`, 38, "NOT") +
    ls_linefeed;
  printContent += getLineSpace();
  printContent +=
    ls_Center +
    ls_double +
    getDivideString(`성명 : ________________________`, 38, "NOT") +
    ls_linefeed;
  printContent += getLineSpace();
  printContent +=
    ls_Center +
    getDivideString(`전화번호 : ______________________`, 38, "NOT") +
    ls_linefeed;
  printContent += getLineSpace();
  printContent += getLineSpace();
  printContent +=
    ls_Left +
    ls_double +
    getDivideString(
      `[ 필수 ] 개인정보 수집 및 이용동의·상품 안내 사항`,
      38,
      "NOT",
    ) +
    ls_linefeed;
  printContent += getLineSpace();
  printContent +=
    ls_Left +
    ls_normal +
    getDivideString(
      `1) 개인정보의 수집 이옹 목적 : 이벤트 당첨자 선정`,
      38,
      "NOT",
    ) +
    ls_linefeed;
  printContent +=
    ls_Left +
    ls_normal +
    getDivideString(`2) 수집하는 개인정보 항목 : 이름, 연락처`, 38, "NOT") +
    ls_linefeed;
  printContent +=
    ls_Left +
    ls_normal +
    getDivideString(
      `3) 개인정보 보유 및 이용 기간 : 이벤트 당첨자 발표 시 즉시 파기`,
      38,
      "NOT",
    ) +
    ls_linefeed;
  printContent +=
    ls_Left +
    ls_normal +
    getDivideString(
      `※ 개인정보의 수집 및 이용에 대한 동의를 거부하실수 있으나, 이벤트 참여가 제한됩니다.`,
      38,
      "NOT",
    ) +
    ls_linefeed;
  printContent += getLineSpace();
  printContent +=
    ls_Center +
    ls_double +
    getDivideString(`개인정보의 수집 및 이용에 동의 합니다. □`, 38, "NOT") +
    ls_linefeed;
  printContent += getLineSpace();
  printContent += getLineSpace();
  printContent +=
    ls_Left +
    ls_normal +
    getDivideString(
      `5만원 초과 상품의 경우 상품 상담액에 대한 제세공과금 22%는 당첨자 부담입니다.`,
      38,
      "NOT",
    ) +
    ls_linefeed;
  printContent += getLineSpace();
  printContent +=
    ls_Left +
    ls_normal +
    getDivideString(
      `국세 기본법 시행령 제 68조에 의거하여 당첨자 발표 후, 원천세 납무 및 소득신고 목적으로 당첨자의 주민등록번호를 수집할 수 있고,수집한 개인정보는 경품 제공 용도로만 사용합니다.`,
      38,
      "NOT",
    ) +
    ls_linefeed;
  printContent += getLineSpace();
  printContent += getLineSpace();
  printContent +=
    ls_size1 +
    ls_Center +
    getDivideString(`${COMPANY_NAME}`, 38, "NOT") +
    ls_linefeed;
  printContent += getLineSpace();
  printContent += getCut();

  return printContent;
}
