// 車種データベース（国産8メーカー・1980年〜2026年・1500型式以上）
const CAR_DATABASE = {
    "トヨタ": {
        // セダン・コンパクト
        "プリウス": [
            { model: "NHW10", weight: 1240, years: "1997-2003" },
            { model: "NHW11", weight: 1250, years: "2000-2003" },
            { model: "NHW20", weight: 1300, years: "2003-2009" },
            { model: "ZVW30", weight: 1350, years: "2009-2015" },
            { model: "ZVW35", weight: 1380, years: "2012-2015" },
            { model: "ZVW40W", weight: 1450, years: "2011-2021" },
            { model: "ZVW41W", weight: 1480, years: "2011-2021" },
            { model: "ZVW50", weight: 1360, years: "2015-2023" },
            { model: "ZVW51", weight: 1380, years: "2015-2023" },
            { model: "ZVW55", weight: 1440, years: "2015-2023" },
            { model: "MXWH60", weight: 1420, years: "2023-" },
            { model: "MXWH61", weight: 1450, years: "2023-" },
            { model: "MXWH65", weight: 1520, years: "2023-" }
        ],
        "アクア": [
            { model: "NHP10", weight: 1080, years: "2011-2021" },
            { model: "NHP10H", weight: 1100, years: "2017-2021" },
            { model: "MXPK10", weight: 1130, years: "2021-" },
            { model: "MXPK11", weight: 1150, years: "2021-" },
            { model: "MXPK15", weight: 1180, years: "2021-" },
            { model: "MXPK16", weight: 1200, years: "2021-" }
        ],
        "ヤリス": [
            { model: "KSP210", weight: 940, years: "2020-" },
            { model: "MXPA10", weight: 1020, years: "2020-" },
            { model: "MXPA15", weight: 1050, years: "2020-" },
            { model: "MXPH10", weight: 1090, years: "2020-" },
            { model: "MXPH15", weight: 1120, years: "2020-" },
            { model: "GXPA16", weight: 1280, years: "2020-" },
            { model: "MXPA12", weight: 1190, years: "2020-" }
        ],
        "ヴィッツ": [
            { model: "SCP10", weight: 850, years: "1999-2005" },
            { model: "NCP10", weight: 920, years: "1999-2005" },
            { model: "NCP13", weight: 930, years: "1999-2005" },
            { model: "SCP90", weight: 980, years: "2005-2010" },
            { model: "NCP91", weight: 1010, years: "2005-2010" },
            { model: "KSP90", weight: 920, years: "2005-2010" },
            { model: "NSP130", weight: 970, years: "2010-2020" },
            { model: "NCP131", weight: 1010, years: "2010-2020" },
            { model: "NSP135", weight: 1030, years: "2010-2020" },
            { model: "NHP130", weight: 1100, years: "2017-2020" }
        ],
        "カローラ": [
            { model: "AE80", weight: 880, years: "1983-1987" },
            { model: "AE82", weight: 900, years: "1983-1987" },
            { model: "AE91", weight: 950, years: "1987-1991" },
            { model: "AE92", weight: 1000, years: "1987-1991" },
            { model: "AE100", weight: 1010, years: "1991-1995" },
            { model: "AE101", weight: 1050, years: "1991-1995" },
            { model: "AE110", weight: 1040, years: "1995-2000" },
            { model: "AE111", weight: 1080, years: "1995-2000" },
            { model: "NZE120", weight: 1030, years: "2000-2006" },
            { model: "NZE121", weight: 1050, years: "2000-2006" },
            { model: "ZZE122", weight: 1100, years: "2000-2006" },
            { model: "NZE141", weight: 1100, years: "2006-2012" },
            { model: "ZRE142", weight: 1150, years: "2006-2012" },
            { model: "NZE161", weight: 1110, years: "2012-2019" },
            { model: "NRE160", weight: 1130, years: "2015-2019" },
            { model: "ZRE212", weight: 1330, years: "2019-" },
            { model: "ZWE211", weight: 1400, years: "2019-" },
            { model: "ZWE214", weight: 1450, years: "2019-" },
            { model: "NRE210", weight: 1250, years: "2019-" }
        ],
        "カローラスポーツ": [
            { model: "ZWE211H", weight: 1400, years: "2018-" },
            { model: "NRE210H", weight: 1300, years: "2018-" },
            { model: "NRE214H", weight: 1350, years: "2018-" }
        ],
        "カローラツーリング": [
            { model: "ZWE211W", weight: 1410, years: "2019-" },
            { model: "ZWE214W", weight: 1460, years: "2019-" },
            { model: "NRE210W", weight: 1310, years: "2019-" }
        ],
        "カローラクロス": [
            { model: "ZSG10", weight: 1330, years: "2021-" },
            { model: "ZVG11", weight: 1410, years: "2021-" },
            { model: "ZVG15", weight: 1480, years: "2021-" }
        ],
        "カムリ": [
            { model: "SV20", weight: 1150, years: "1986-1990" },
            { model: "SV21", weight: 1180, years: "1986-1990" },
            { model: "SV30", weight: 1250, years: "1990-1994" },
            { model: "SV32", weight: 1280, years: "1990-1994" },
            { model: "SV40", weight: 1300, years: "1994-1998" },
            { model: "SV41", weight: 1340, years: "1994-1998" },
            { model: "ACV30", weight: 1420, years: "2001-2006" },
            { model: "ACV35", weight: 1480, years: "2001-2006" },
            { model: "ACV40", weight: 1470, years: "2006-2011" },
            { model: "ACV45", weight: 1520, years: "2006-2011" },
            { model: "AVV50", weight: 1540, years: "2011-2017" },
            { model: "AXVH70", weight: 1600, years: "2017-" },
            { model: "AXVA70", weight: 1550, years: "2017-" }
        ],
        "クラウン": [
            { model: "MS120", weight: 1350, years: "1983-1987" },
            { model: "MS130", weight: 1400, years: "1987-1991" },
            { model: "JZS130", weight: 1500, years: "1987-1991" },
            { model: "JZS140", weight: 1520, years: "1991-1995" },
            { model: "JZS150", weight: 1540, years: "1995-1999" },
            { model: "JZS170", weight: 1550, years: "1999-2003" },
            { model: "JZS171", weight: 1570, years: "1999-2003" },
            { model: "GRS180", weight: 1580, years: "2003-2008" },
            { model: "GRS182", weight: 1600, years: "2003-2008" },
            { model: "GRS200", weight: 1620, years: "2008-2012" },
            { model: "GRS202", weight: 1650, years: "2008-2012" },
            { model: "GRS210", weight: 1640, years: "2012-2018" },
            { model: "AWS210", weight: 1720, years: "2013-2018" },
            { model: "ARS220", weight: 1690, years: "2018-2022" },
            { model: "AZSH20", weight: 1770, years: "2018-2022" },
            { model: "AZSH21", weight: 1800, years: "2018-2022" },
            { model: "TZSH35", weight: 1930, years: "2022-" },
            { model: "KZSH30", weight: 2010, years: "2022-" }
        ],
        "マークII": [
            { model: "GX71", weight: 1280, years: "1984-1988" },
            { model: "GX81", weight: 1320, years: "1988-1992" },
            { model: "JZX90", weight: 1400, years: "1992-1996" },
            { model: "JZX100", weight: 1430, years: "1996-2000" },
            { model: "JZX110", weight: 1450, years: "2000-2004" },
            { model: "GRX120", weight: 1500, years: "2004-2009" },
            { model: "GRX130", weight: 1530, years: "2009-2019" }
        ],
        "マークX": [
            { model: "GRX120", weight: 1500, years: "2004-2009" },
            { model: "GRX121", weight: 1530, years: "2004-2009" },
            { model: "GRX130", weight: 1530, years: "2009-2019" },
            { model: "GRX133", weight: 1560, years: "2009-2019" },
            { model: "GRX135", weight: 1600, years: "2009-2019" }
        ],
        "セルシオ": [
            { model: "UCF10", weight: 1760, years: "1989-1994" },
            { model: "UCF11", weight: 1780, years: "1989-1994" },
            { model: "UCF20", weight: 1800, years: "1994-2000" },
            { model: "UCF21", weight: 1830, years: "1994-2000" },
            { model: "UCF30", weight: 1850, years: "2000-2006" },
            { model: "UCF31", weight: 1880, years: "2000-2006" }
        ],
        "アリスト": [
            { model: "JZS147", weight: 1600, years: "1991-1997" },
            { model: "JZS160", weight: 1650, years: "1997-2005" },
            { model: "JZS161", weight: 1700, years: "1997-2005" }
        ],
        "センチュリー": [
            { model: "GZG50", weight: 2300, years: "1997-2017" },
            { model: "UWG60", weight: 2370, years: "2018-" }
        ],
        // ミニバン
        "アルファード": [
            { model: "ANH10W", weight: 1850, years: "2002-2008" },
            { model: "ANH15W", weight: 1920, years: "2002-2008" },
            { model: "MNH10W", weight: 1900, years: "2002-2008" },
            { model: "ANH20W", weight: 1880, years: "2008-2015" },
            { model: "ANH25W", weight: 1950, years: "2008-2015" },
            { model: "GGH20W", weight: 1990, years: "2008-2015" },
            { model: "ATH20W", weight: 2010, years: "2011-2015" },
            { model: "AGH30W", weight: 1920, years: "2015-2023" },
            { model: "AGH35W", weight: 1990, years: "2015-2023" },
            { model: "GGH30W", weight: 2000, years: "2015-2023" },
            { model: "AYH30W", weight: 2090, years: "2015-2023" },
            { model: "AAHH40W", weight: 2060, years: "2023-" },
            { model: "AAHH45W", weight: 2130, years: "2023-" }
        ],
        "ヴェルファイア": [
            { model: "ANH20W", weight: 1880, years: "2008-2015" },
            { model: "ANH25W", weight: 1950, years: "2008-2015" },
            { model: "GGH20W", weight: 1990, years: "2008-2015" },
            { model: "AGH30W", weight: 1920, years: "2015-2023" },
            { model: "AGH35W", weight: 1990, years: "2015-2023" },
            { model: "GGH30W", weight: 2000, years: "2015-2023" },
            { model: "AAHH40W", weight: 2060, years: "2023-" }
        ],
        "エスティマ": [
            { model: "TCR10W", weight: 1700, years: "1990-2000" },
            { model: "TCR20W", weight: 1750, years: "1990-2000" },
            { model: "ACR30W", weight: 1680, years: "2000-2006" },
            { model: "ACR40W", weight: 1720, years: "2000-2006" },
            { model: "MCR30W", weight: 1780, years: "2000-2006" },
            { model: "ACR50W", weight: 1730, years: "2006-2019" },
            { model: "ACR55W", weight: 1790, years: "2006-2019" },
            { model: "GSR50W", weight: 1850, years: "2006-2019" },
            { model: "AHR20W", weight: 1880, years: "2006-2019" }
        ],
        "ノア": [
            { model: "SR40G", weight: 1450, years: "1996-2001" },
            { model: "AZR60G", weight: 1490, years: "2001-2007" },
            { model: "AZR65G", weight: 1540, years: "2001-2007" },
            { model: "ZRR70G", weight: 1520, years: "2007-2014" },
            { model: "ZRR75G", weight: 1580, years: "2007-2014" },
            { model: "ZRR80G", weight: 1570, years: "2014-2022" },
            { model: "ZRR85G", weight: 1630, years: "2014-2022" },
            { model: "ZWR80G", weight: 1620, years: "2016-2022" },
            { model: "ZWR90W", weight: 1640, years: "2022-" },
            { model: "MZRA90W", weight: 1600, years: "2022-" }
        ],
        "ヴォクシー": [
            { model: "AZR60G", weight: 1490, years: "2001-2007" },
            { model: "AZR65G", weight: 1540, years: "2001-2007" },
            { model: "ZRR70G", weight: 1530, years: "2007-2014" },
            { model: "ZRR75G", weight: 1590, years: "2007-2014" },
            { model: "ZRR80G", weight: 1570, years: "2014-2022" },
            { model: "ZRR85G", weight: 1640, years: "2014-2022" },
            { model: "ZWR80G", weight: 1620, years: "2016-2022" },
            { model: "ZWR90W", weight: 1640, years: "2022-" }
        ],
        "シエンタ": [
            { model: "NCP81G", weight: 1300, years: "2003-2015" },
            { model: "NCP85G", weight: 1350, years: "2003-2015" },
            { model: "NSP170G", weight: 1320, years: "2015-2022" },
            { model: "NCP175G", weight: 1340, years: "2015-2022" },
            { model: "NHP170G", weight: 1380, years: "2015-2022" },
            { model: "MXPC10G", weight: 1270, years: "2022-" },
            { model: "MXPL10G", weight: 1340, years: "2022-" },
            { model: "MXPL15G", weight: 1380, years: "2022-" }
        ],
        "ウィッシュ": [
            { model: "ZNE10G", weight: 1300, years: "2003-2009" },
            { model: "ZNE14G", weight: 1350, years: "2003-2009" },
            { model: "ANE10G", weight: 1380, years: "2003-2009" },
            { model: "ZGE20G", weight: 1370, years: "2009-2017" },
            { model: "ZGE21G", weight: 1400, years: "2009-2017" },
            { model: "ZGE25G", weight: 1420, years: "2009-2017" }
        ],
        "アイシス": [
            { model: "ANM10G", weight: 1400, years: "2004-2017" },
            { model: "ANM15G", weight: 1450, years: "2004-2017" },
            { model: "ZNM10G", weight: 1350, years: "2004-2017" },
            { model: "ZGM10G", weight: 1390, years: "2009-2017" },
            { model: "ZGM11G", weight: 1420, years: "2009-2017" },
            { model: "ZGM15G", weight: 1470, years: "2009-2017" }
        ],
        // SUV・クロスオーバー
        "ハリアー": [
            { model: "SXU10W", weight: 1520, years: "1997-2003" },
            { model: "SXU15W", weight: 1580, years: "1997-2003" },
            { model: "MCU10W", weight: 1620, years: "1997-2003" },
            { model: "ACU30W", weight: 1530, years: "2003-2013" },
            { model: "ACU35W", weight: 1590, years: "2003-2013" },
            { model: "MCU30W", weight: 1630, years: "2003-2013" },
            { model: "MHU38W", weight: 1700, years: "2005-2013" },
            { model: "ZSU60W", weight: 1580, years: "2013-2020" },
            { model: "ZSU65W", weight: 1630, years: "2013-2020" },
            { model: "AVU65W", weight: 1740, years: "2014-2020" },
            { model: "MXUA80", weight: 1530, years: "2020-" },
            { model: "MXUA85", weight: 1610, years: "2020-" },
            { model: "AXUH80", weight: 1680, years: "2020-" },
            { model: "AXUH85", weight: 1750, years: "2020-" }
        ],
        "RAV4": [
            { model: "SXA10G", weight: 1190, years: "1994-2000" },
            { model: "SXA11G", weight: 1250, years: "1994-2000" },
            { model: "ACA20W", weight: 1330, years: "2000-2005" },
            { model: "ACA21W", weight: 1380, years: "2000-2005" },
            { model: "ACA31W", weight: 1380, years: "2005-2016" },
            { model: "ACA36W", weight: 1430, years: "2005-2016" },
            { model: "MXAA52", weight: 1500, years: "2019-" },
            { model: "MXAA54", weight: 1570, years: "2019-" },
            { model: "AXAH52", weight: 1620, years: "2019-" },
            { model: "AXAH54", weight: 1690, years: "2019-" }
        ],
        "ランドクルーザー": [
            { model: "HZJ70", weight: 1900, years: "1984-2004" },
            { model: "HZJ71", weight: 1950, years: "1990-2004" },
            { model: "FZJ80G", weight: 2350, years: "1989-1998" },
            { model: "HDJ81V", weight: 2400, years: "1990-1998" },
            { model: "UZJ100W", weight: 2450, years: "1998-2007" },
            { model: "HDJ101K", weight: 2500, years: "1998-2007" },
            { model: "UZJ200W", weight: 2570, years: "2007-2021" },
            { model: "URJ202W", weight: 2630, years: "2015-2021" },
            { model: "VJA300W", weight: 2490, years: "2021-" },
            { model: "FJA300W", weight: 2560, years: "2021-" }
        ],
        "ランドクルーザープラド": [
            { model: "KZJ78G", weight: 1850, years: "1990-1996" },
            { model: "KZJ95W", weight: 1920, years: "1996-2002" },
            { model: "RZJ95W", weight: 1880, years: "1996-2002" },
            { model: "TRJ120W", weight: 1930, years: "2002-2009" },
            { model: "GRJ120W", weight: 2010, years: "2002-2009" },
            { model: "TRJ150W", weight: 2050, years: "2009-" },
            { model: "GDJ150W", weight: 2320, years: "2015-" },
            { model: "GDJ151W", weight: 2380, years: "2015-" }
        ],
        "ハイラックスサーフ": [
            { model: "LN130W", weight: 1650, years: "1989-1995" },
            { model: "VZN130G", weight: 1700, years: "1989-1995" },
            { model: "KZN185G", weight: 1780, years: "1995-2002" },
            { model: "VZN185W", weight: 1750, years: "1995-2002" },
            { model: "TRN210W", weight: 1800, years: "2002-2009" },
            { model: "TRN215W", weight: 1850, years: "2002-2009" },
            { model: "GRN215W", weight: 1920, years: "2002-2009" }
        ],
        "C-HR": [
            { model: "NGX10", weight: 1440, years: "2016-2023" },
            { model: "NGX50", weight: 1480, years: "2016-2023" },
            { model: "ZYX10", weight: 1440, years: "2016-2023" },
            { model: "ZYX11", weight: 1490, years: "2019-2023" }
        ],
        "ライズ": [
            { model: "A200A", weight: 970, years: "2019-" },
            { model: "A210A", weight: 1020, years: "2019-" },
            { model: "A200Z", weight: 1060, years: "2021-" },
            { model: "A202A", weight: 1050, years: "2021-" }
        ],
        "ルーミー": [
            { model: "M900A", weight: 1070, years: "2016-" },
            { model: "M910A", weight: 1100, years: "2016-" }
        ],
        "タンク": [
            { model: "M900A", weight: 1070, years: "2016-2020" },
            { model: "M910A", weight: 1100, years: "2016-2020" }
        ],
        // 商用車
        "ハイエース": [
            { model: "LH100G", weight: 1580, years: "1989-2004" },
            { model: "LH200V", weight: 1690, years: "2004-" },
            { model: "TRH200V", weight: 1690, years: "2004-" },
            { model: "TRH200K", weight: 1720, years: "2004-" },
            { model: "KDH200V", weight: 1750, years: "2004-" },
            { model: "KDH201V", weight: 1800, years: "2004-" },
            { model: "GDH201V", weight: 1880, years: "2017-" },
            { model: "GDH206V", weight: 1920, years: "2017-" }
        ],
        "レジアスエース": [
            { model: "TRH200V", weight: 1690, years: "2004-" },
            { model: "KDH200V", weight: 1750, years: "2004-" },
            { model: "GDH201V", weight: 1880, years: "2017-" }
        ],
        "プロボックス": [
            { model: "NCP50V", weight: 1050, years: "2002-2014" },
            { model: "NCP51V", weight: 1070, years: "2002-2014" },
            { model: "NCP55V", weight: 1120, years: "2002-2014" },
            { model: "NSP160V", weight: 1060, years: "2014-" },
            { model: "NCP160V", weight: 1090, years: "2014-" },
            { model: "NCP165V", weight: 1140, years: "2014-" }
        ],
        "サクシード": [
            { model: "NCP51V", weight: 1070, years: "2002-2014" },
            { model: "NCP55V", weight: 1120, years: "2002-2014" },
            { model: "NCP160V", weight: 1090, years: "2014-2020" },
            { model: "NCP165V", weight: 1140, years: "2014-2020" }
        ],
        // スポーツカー
        "86": [
            { model: "ZN6", weight: 1210, years: "2012-2021" }
        ],
        "GR86": [
            { model: "ZN8", weight: 1270, years: "2021-" }
        ],
        "スープラ": [
            { model: "MA70", weight: 1450, years: "1986-1993" },
            { model: "JZA70", weight: 1480, years: "1990-1993" },
            { model: "JZA80", weight: 1510, years: "1993-2002" },
            { model: "DB42", weight: 1520, years: "2019-" },
            { model: "DB82", weight: 1410, years: "2020-" },
            { model: "DB02", weight: 1420, years: "2022-" }
        ],
        "MR2": [
            { model: "AW11", weight: 950, years: "1984-1989" },
            { model: "SW20", weight: 1200, years: "1989-1999" }
        ],
        "MR-S": [
            { model: "ZZW30", weight: 970, years: "1999-2007" }
        ],
        "セリカ": [
            { model: "ST162", weight: 1100, years: "1985-1989" },
            { model: "ST182", weight: 1180, years: "1989-1993" },
            { model: "ST183", weight: 1250, years: "1989-1993" },
            { model: "ST202", weight: 1200, years: "1993-1999" },
            { model: "ST205", weight: 1340, years: "1994-1999" },
            { model: "ZZT230", weight: 1080, years: "1999-2006" },
            { model: "ZZT231", weight: 1130, years: "1999-2006" }
        ],
        "GRヤリス": [
            { model: "GXPA16", weight: 1280, years: "2020-" },
            { model: "MXPA12", weight: 1130, years: "2020-" }
        ],
        "GRカローラ": [
            { model: "GZEA14H", weight: 1470, years: "2022-" }
        ],
        // 軽自動車
        "ピクシスエポック": [
            { model: "LA300A", weight: 730, years: "2012-2017", isKei: true },
            { model: "LA350A", weight: 650, years: "2017-", isKei: true },
            { model: "LA360A", weight: 700, years: "2017-", isKei: true }
        ],
        "ピクシスメガ": [
            { model: "LA700A", weight: 850, years: "2015-", isKei: true },
            { model: "LA710A", weight: 880, years: "2015-", isKei: true }
        ],
        "ピクシスジョイ": [
            { model: "LA250A", weight: 820, years: "2016-", isKei: true },
            { model: "LA260A", weight: 850, years: "2016-", isKei: true }
        ],
        "コペンGRスポーツ": [
            { model: "LA400A", weight: 870, years: "2019-", isKei: true }
        ],
        // 追加車種（1980年代〜2000年代）
        "スターレット": [
            { model: "KP61", weight: 750, years: "1978-1984" },
            { model: "EP71", weight: 780, years: "1984-1989" },
            { model: "EP82", weight: 850, years: "1989-1996" },
            { model: "EP91", weight: 900, years: "1996-1999" }
        ],
        "ターセル": [
            { model: "AL20", weight: 850, years: "1982-1986" },
            { model: "EL30", weight: 890, years: "1986-1990" },
            { model: "EL40", weight: 920, years: "1990-1994" },
            { model: "EL50", weight: 950, years: "1994-1999" }
        ],
        "コルサ": [
            { model: "AL20", weight: 850, years: "1982-1986" },
            { model: "EL30", weight: 890, years: "1986-1990" },
            { model: "EL40", weight: 920, years: "1990-1994" },
            { model: "EL50", weight: 950, years: "1994-1999" }
        ],
        "カリーナ": [
            { model: "AA63", weight: 1050, years: "1983-1988" },
            { model: "AT170", weight: 1080, years: "1988-1992" },
            { model: "AT190", weight: 1100, years: "1992-1996" },
            { model: "AT210", weight: 1130, years: "1996-2001" },
            { model: "AT211", weight: 1150, years: "1996-2001" },
            { model: "AT212", weight: 1170, years: "1998-2001" }
        ],
        "カリーナED": [
            { model: "ST160", weight: 1100, years: "1985-1989" },
            { model: "ST180", weight: 1150, years: "1989-1993" },
            { model: "ST200", weight: 1180, years: "1993-1998" }
        ],
        "コロナ": [
            { model: "AT150", weight: 1050, years: "1983-1987" },
            { model: "AT170", weight: 1100, years: "1987-1992" },
            { model: "AT190", weight: 1130, years: "1992-1996" },
            { model: "AT210", weight: 1150, years: "1996-2001" },
            { model: "ST210", weight: 1170, years: "1996-2001" }
        ],
        "コロナエクシブ": [
            { model: "ST180", weight: 1120, years: "1989-1993" },
            { model: "ST200", weight: 1150, years: "1993-1998" }
        ],
        "チェイサー": [
            { model: "GX71", weight: 1280, years: "1984-1988" },
            { model: "GX81", weight: 1320, years: "1988-1992" },
            { model: "JZX90", weight: 1400, years: "1992-1996" },
            { model: "JZX100", weight: 1430, years: "1996-2001" },
            { model: "JZX101", weight: 1450, years: "1996-2001" },
            { model: "JZX105", weight: 1480, years: "1996-2001" }
        ],
        "クレスタ": [
            { model: "GX71", weight: 1280, years: "1984-1988" },
            { model: "GX81", weight: 1320, years: "1988-1992" },
            { model: "JZX90", weight: 1400, years: "1992-1996" },
            { model: "JZX100", weight: 1430, years: "1996-2001" },
            { model: "JZX101", weight: 1450, years: "1996-2001" }
        ],
        "ソアラ": [
            { model: "GZ10", weight: 1350, years: "1981-1986" },
            { model: "GZ20", weight: 1450, years: "1986-1991" },
            { model: "JZZ30", weight: 1550, years: "1991-2000" },
            { model: "JZZ31", weight: 1580, years: "1991-2000" },
            { model: "UZZ40", weight: 1740, years: "2001-2010" }
        ],
        "ウィンダム": [
            { model: "VCV10", weight: 1480, years: "1991-1996" },
            { model: "VCV11", weight: 1510, years: "1991-1996" },
            { model: "MCV20", weight: 1520, years: "1996-2001" },
            { model: "MCV21", weight: 1550, years: "1996-2001" },
            { model: "MCV30", weight: 1550, years: "2001-2006" }
        ],
        "アバロン": [
            { model: "MCX10", weight: 1520, years: "1995-2000" }
        ],
        "プログレ": [
            { model: "JCG10", weight: 1470, years: "1998-2007" },
            { model: "JCG11", weight: 1500, years: "1998-2007" },
            { model: "JCG15", weight: 1520, years: "1998-2007" }
        ],
        "ブレビス": [
            { model: "JCG10", weight: 1470, years: "2001-2007" },
            { model: "JCG11", weight: 1500, years: "2001-2007" },
            { model: "JCG15", weight: 1520, years: "2001-2007" }
        ],
        "ヴェロッサ": [
            { model: "JZX110", weight: 1450, years: "2001-2004" },
            { model: "GX110", weight: 1420, years: "2001-2004" },
            { model: "GX115", weight: 1470, years: "2001-2004" }
        ],
        "アルテッツァ": [
            { model: "SXE10", weight: 1340, years: "1998-2005" },
            { model: "GXE10", weight: 1360, years: "1998-2005" }
        ],
        "アルテッツァジータ": [
            { model: "JCE10W", weight: 1440, years: "2001-2005" },
            { model: "GXE10W", weight: 1400, years: "2001-2005" }
        ],
        "ビスタ": [
            { model: "SV30", weight: 1150, years: "1990-1994" },
            { model: "SV40", weight: 1200, years: "1994-1998" },
            { model: "SV50", weight: 1250, years: "1998-2003" },
            { model: "AZV50", weight: 1300, years: "1998-2003" },
            { model: "ZZV50", weight: 1280, years: "1998-2003" }
        ],
        "ビスタアルデオ": [
            { model: "SV50G", weight: 1280, years: "1998-2003" },
            { model: "AZV50G", weight: 1320, years: "1998-2003" },
            { model: "ZZV50G", weight: 1300, years: "1998-2003" }
        ],
        "カルディナ": [
            { model: "ST190G", weight: 1200, years: "1992-1997" },
            { model: "ST191G", weight: 1220, years: "1992-1997" },
            { model: "ST195G", weight: 1280, years: "1994-1997" },
            { model: "ST210G", weight: 1250, years: "1997-2002" },
            { model: "ST215G", weight: 1320, years: "1997-2002" },
            { model: "ST246W", weight: 1340, years: "2002-2007" },
            { model: "AZT241W", weight: 1300, years: "2002-2007" },
            { model: "AZT246W", weight: 1360, years: "2002-2007" }
        ],
        "スプリンター": [
            { model: "AE91", weight: 950, years: "1987-1991" },
            { model: "AE100", weight: 1000, years: "1991-1995" },
            { model: "AE110", weight: 1030, years: "1995-2000" }
        ],
        "スプリンターカリブ": [
            { model: "AE95G", weight: 1050, years: "1988-1995" },
            { model: "AE111G", weight: 1100, years: "1995-2002" },
            { model: "AE114G", weight: 1150, years: "1995-2002" },
            { model: "AE115G", weight: 1170, years: "1995-2002" }
        ],
        "スプリンタートレノ": [
            { model: "AE86", weight: 940, years: "1983-1987" },
            { model: "AE92", weight: 1020, years: "1987-1991" },
            { model: "AE101", weight: 1070, years: "1991-1995" },
            { model: "AE111", weight: 1100, years: "1995-2000" }
        ],
        "カローラレビン": [
            { model: "AE86", weight: 940, years: "1983-1987" },
            { model: "AE92", weight: 1020, years: "1987-1991" },
            { model: "AE101", weight: 1070, years: "1991-1995" },
            { model: "AE111", weight: 1100, years: "1995-2000" }
        ],
        "オーパ": [
            { model: "ACT10", weight: 1240, years: "2000-2005" },
            { model: "ZCT10", weight: 1200, years: "2000-2005" },
            { model: "ZCT15", weight: 1250, years: "2002-2005" }
        ],
        "マスターエースサーフ": [
            { model: "YR20G", weight: 1350, years: "1982-1988" },
            { model: "CR30G", weight: 1420, years: "1982-1988" }
        ],
        "タウンエース": [
            { model: "YR20G", weight: 1350, years: "1982-1988" },
            { model: "CR30G", weight: 1420, years: "1988-1996" },
            { model: "KR42V", weight: 1280, years: "1996-2008" },
            { model: "S402M", weight: 1150, years: "2008-" }
        ],
        "ライトエース": [
            { model: "YM30G", weight: 1200, years: "1985-1992" },
            { model: "CR31G", weight: 1280, years: "1992-1996" },
            { model: "KR42V", weight: 1250, years: "1996-2008" },
            { model: "S402M", weight: 1100, years: "2008-" }
        ],
        "グランビア": [
            { model: "VCH10W", weight: 1820, years: "1995-2002" },
            { model: "KCH10W", weight: 1880, years: "1995-2002" },
            { model: "RCH11W", weight: 1900, years: "1995-2002" }
        ],
        "グランドハイエース": [
            { model: "VCH10W", weight: 1850, years: "1999-2002" },
            { model: "KCH10W", weight: 1920, years: "1999-2002" }
        ],
        "レジアス": [
            { model: "RCH41W", weight: 1700, years: "1997-2002" },
            { model: "KCH40W", weight: 1780, years: "1997-2002" }
        ],
        "ツーリングハイエース": [
            { model: "RCH41W", weight: 1720, years: "1999-2002" },
            { model: "KCH40W", weight: 1800, years: "1999-2002" }
        ],
        "イプサム": [
            { model: "SXM10G", weight: 1450, years: "1996-2001" },
            { model: "SXM15G", weight: 1500, years: "1996-2001" },
            { model: "ACM21W", weight: 1520, years: "2001-2009" },
            { model: "ACM26W", weight: 1580, years: "2001-2009" }
        ],
        "ナディア": [
            { model: "SXN10", weight: 1320, years: "1998-2003" },
            { model: "SXN15", weight: 1380, years: "1998-2003" },
            { model: "ACN10", weight: 1350, years: "2001-2003" },
            { model: "ACN15", weight: 1400, years: "2001-2003" }
        ],
        "ガイア": [
            { model: "SXM10G", weight: 1450, years: "1998-2004" },
            { model: "SXM15G", weight: 1500, years: "1998-2004" },
            { model: "ACM10G", weight: 1480, years: "2001-2004" },
            { model: "ACM15G", weight: 1530, years: "2001-2004" }
        ],
        "マークIIブリット": [
            { model: "GX110W", weight: 1450, years: "2002-2007" },
            { model: "GX115W", weight: 1510, years: "2002-2007" },
            { model: "JZX110W", weight: 1520, years: "2002-2007" },
            { model: "JZX115W", weight: 1580, years: "2002-2007" }
        ],
        "クルーガー": [
            { model: "ACU20W", weight: 1560, years: "2000-2007" },
            { model: "ACU25W", weight: 1620, years: "2000-2007" },
            { model: "MCU20W", weight: 1600, years: "2000-2007" },
            { model: "MCU25W", weight: 1660, years: "2000-2007" },
            { model: "MHU28W", weight: 1720, years: "2005-2007" }
        ],
        "ヴァンガード": [
            { model: "ACA33W", weight: 1540, years: "2007-2013" },
            { model: "ACA38W", weight: 1600, years: "2007-2013" },
            { model: "GSA33W", weight: 1660, years: "2007-2013" }
        ],
        "FJクルーザー": [
            { model: "GSJ15W", weight: 1940, years: "2010-2018" }
        ],
        "ハイラックス": [
            { model: "LN106", weight: 1580, years: "1988-1997" },
            { model: "LN107", weight: 1620, years: "1988-1997" },
            { model: "LN165", weight: 1650, years: "1997-2004" },
            { model: "GUN125", weight: 2080, years: "2017-" }
        ],
        "bB": [
            { model: "NCP30", weight: 1010, years: "2000-2005" },
            { model: "NCP31", weight: 1030, years: "2000-2005" },
            { model: "NCP35", weight: 1080, years: "2000-2005" },
            { model: "QNC20", weight: 1050, years: "2005-2016" },
            { model: "QNC21", weight: 1070, years: "2005-2016" },
            { model: "QNC25", weight: 1110, years: "2005-2016" }
        ],
        "ist": [
            { model: "NCP60", weight: 1090, years: "2002-2007" },
            { model: "NCP61", weight: 1110, years: "2002-2007" },
            { model: "NCP110", weight: 1130, years: "2007-2016" },
            { model: "NCP115", weight: 1170, years: "2007-2016" },
            { model: "ZSP110", weight: 1100, years: "2007-2016" }
        ],
        "ラクティス": [
            { model: "NCP100", weight: 1130, years: "2005-2010" },
            { model: "NCP105", weight: 1170, years: "2005-2010" },
            { model: "SCP100", weight: 1090, years: "2005-2010" },
            { model: "NSP120", weight: 1080, years: "2010-2016" },
            { model: "NCP120", weight: 1110, years: "2010-2016" },
            { model: "NCP125", weight: 1150, years: "2010-2016" }
        ],
        "ラッシュ": [
            { model: "J200E", weight: 1130, years: "2006-2016" },
            { model: "J210E", weight: 1170, years: "2006-2016" }
        ],
        "パッソ": [
            { model: "KGC10", weight: 920, years: "2004-2010" },
            { model: "QNC10", weight: 1000, years: "2004-2010" },
            { model: "KGC30", weight: 920, years: "2010-2016" },
            { model: "NGC30", weight: 950, years: "2010-2016" },
            { model: "M700A", weight: 910, years: "2016-" },
            { model: "M710A", weight: 960, years: "2016-" }
        ],
        "ポルテ": [
            { model: "NNP10", weight: 1190, years: "2004-2012" },
            { model: "NNP11", weight: 1120, years: "2004-2012" },
            { model: "NCP141", weight: 1190, years: "2012-2020" },
            { model: "NSP140", weight: 1110, years: "2012-2020" },
            { model: "NCP145", weight: 1230, years: "2012-2020" }
        ],
        "スペイド": [
            { model: "NCP141", weight: 1190, years: "2012-2020" },
            { model: "NSP140", weight: 1110, years: "2012-2020" },
            { model: "NCP145", weight: 1230, years: "2012-2020" }
        ],
        "ベルタ": [
            { model: "SCP92", weight: 1000, years: "2005-2012" },
            { model: "NCP96", weight: 1050, years: "2005-2012" },
            { model: "KSP92", weight: 950, years: "2005-2012" }
        ],
        "プレミオ": [
            { model: "ZZT240", weight: 1180, years: "2001-2007" },
            { model: "NZT240", weight: 1150, years: "2001-2007" },
            { model: "AZT240", weight: 1220, years: "2001-2007" },
            { model: "ZRT260", weight: 1280, years: "2007-2021" },
            { model: "NZT260", weight: 1220, years: "2007-2021" },
            { model: "ZRT265", weight: 1340, years: "2007-2021" }
        ],
        "アリオン": [
            { model: "ZZT240", weight: 1180, years: "2001-2007" },
            { model: "NZT240", weight: 1150, years: "2001-2007" },
            { model: "AZT240", weight: 1220, years: "2001-2007" },
            { model: "ZRT260", weight: 1280, years: "2007-2021" },
            { model: "NZT260", weight: 1220, years: "2007-2021" },
            { model: "ZRT265", weight: 1340, years: "2007-2021" }
        ],
        "SAI": [
            { model: "AZK10", weight: 1570, years: "2009-2017" }
        ],
        "ブレイド": [
            { model: "AZE154H", weight: 1420, years: "2006-2012" },
            { model: "AZE156H", weight: 1450, years: "2006-2012" },
            { model: "GRE156H", weight: 1520, years: "2007-2012" }
        ],
        "オーリス": [
            { model: "NZE151H", weight: 1200, years: "2006-2012" },
            { model: "ZRE152H", weight: 1280, years: "2006-2012" },
            { model: "ZRE154H", weight: 1280, years: "2006-2012" },
            { model: "NZE181H", weight: 1230, years: "2012-2018" },
            { model: "ZRE186H", weight: 1320, years: "2012-2018" },
            { model: "NRE185H", weight: 1270, years: "2015-2018" }
        ]
    },
    "ホンダ": {
        "フィット": [
            { model: "GD1", weight: 1010, years: "2001-2007" },
            { model: "GD2", weight: 1040, years: "2001-2007" },
            { model: "GD3", weight: 1050, years: "2001-2007" },
            { model: "GE6", weight: 1010, years: "2007-2013" },
            { model: "GE7", weight: 1040, years: "2007-2013" },
            { model: "GE8", weight: 1040, years: "2007-2013" },
            { model: "GP1", weight: 1130, years: "2010-2013" },
            { model: "GK3", weight: 1010, years: "2013-2020" },
            { model: "GK4", weight: 1040, years: "2013-2020" },
            { model: "GK5", weight: 1050, years: "2013-2020" },
            { model: "GP5", weight: 1130, years: "2013-2020" },
            { model: "GR1", weight: 1080, years: "2020-" },
            { model: "GR2", weight: 1110, years: "2020-" },
            { model: "GR3", weight: 1090, years: "2020-" },
            { model: "GR5", weight: 1150, years: "2020-" },
            { model: "GR6", weight: 1180, years: "2020-" }
        ],
        "シビック": [
            { model: "EF2", weight: 900, years: "1987-1991" },
            { model: "EF9", weight: 980, years: "1989-1991" },
            { model: "EG4", weight: 930, years: "1991-1995" },
            { model: "EG6", weight: 1010, years: "1991-1995" },
            { model: "EK3", weight: 990, years: "1995-2000" },
            { model: "EK4", weight: 1020, years: "1995-2000" },
            { model: "EK9", weight: 1050, years: "1997-2000" },
            { model: "EU1", weight: 1100, years: "2000-2005" },
            { model: "EU3", weight: 1130, years: "2000-2005" },
            { model: "EP3", weight: 1180, years: "2001-2005" },
            { model: "FD1", weight: 1240, years: "2005-2011" },
            { model: "FD2", weight: 1270, years: "2005-2011" },
            { model: "FK7", weight: 1330, years: "2017-2021" },
            { model: "FC1", weight: 1290, years: "2017-2021" },
            { model: "FL1", weight: 1370, years: "2021-" },
            { model: "FL4", weight: 1460, years: "2022-" }
        ],
        "シビックタイプR": [
            { model: "EK9", weight: 1050, years: "1997-2000" },
            { model: "EP3", weight: 1180, years: "2001-2005" },
            { model: "FD2", weight: 1270, years: "2007-2010" },
            { model: "FK2", weight: 1380, years: "2015-2017" },
            { model: "FK8", weight: 1390, years: "2017-2021" },
            { model: "FL5", weight: 1430, years: "2022-" }
        ],
        "アコード": [
            { model: "CA1", weight: 1100, years: "1985-1989" },
            { model: "CB3", weight: 1200, years: "1989-1993" },
            { model: "CD3", weight: 1250, years: "1993-1997" },
            { model: "CF4", weight: 1320, years: "1997-2002" },
            { model: "CL7", weight: 1380, years: "2002-2008" },
            { model: "CL8", weight: 1400, years: "2002-2008" },
            { model: "CU2", weight: 1480, years: "2008-2013" },
            { model: "CR6", weight: 1570, years: "2013-2020" },
            { model: "CV3", weight: 1560, years: "2020-" }
        ],
        "ヴェゼル": [
            { model: "RU1", weight: 1180, years: "2013-2021" },
            { model: "RU2", weight: 1220, years: "2013-2021" },
            { model: "RU3", weight: 1270, years: "2016-2021" },
            { model: "RU4", weight: 1310, years: "2016-2021" },
            { model: "RV3", weight: 1250, years: "2021-" },
            { model: "RV4", weight: 1290, years: "2021-" },
            { model: "RV5", weight: 1350, years: "2021-" },
            { model: "RV6", weight: 1390, years: "2021-" }
        ],
        "CR-V": [
            { model: "RD1", weight: 1380, years: "1995-2001" },
            { model: "RD4", weight: 1410, years: "2001-2006" },
            { model: "RD5", weight: 1460, years: "2001-2006" },
            { model: "RE3", weight: 1520, years: "2006-2011" },
            { model: "RE4", weight: 1560, years: "2006-2011" },
            { model: "RM1", weight: 1470, years: "2011-2016" },
            { model: "RM4", weight: 1520, years: "2011-2016" },
            { model: "RW1", weight: 1520, years: "2018-" },
            { model: "RW2", weight: 1560, years: "2018-" },
            { model: "RT5", weight: 1600, years: "2018-" },
            { model: "RT6", weight: 1640, years: "2018-" }
        ],
        "ZR-V": [
            { model: "RZ3", weight: 1460, years: "2023-" },
            { model: "RZ4", weight: 1500, years: "2023-" },
            { model: "RZ5", weight: 1560, years: "2023-" },
            { model: "RZ6", weight: 1600, years: "2023-" }
        ],
        "フリード": [
            { model: "GB3", weight: 1350, years: "2008-2016" },
            { model: "GB4", weight: 1390, years: "2008-2016" },
            { model: "GP3", weight: 1430, years: "2011-2016" },
            { model: "GB5", weight: 1360, years: "2016-" },
            { model: "GB6", weight: 1400, years: "2016-" },
            { model: "GB7", weight: 1430, years: "2016-" },
            { model: "GB8", weight: 1470, years: "2016-" }
        ],
        "ステップワゴン": [
            { model: "RF1", weight: 1430, years: "1996-2001" },
            { model: "RF2", weight: 1480, years: "1996-2001" },
            { model: "RF3", weight: 1490, years: "2001-2005" },
            { model: "RF4", weight: 1540, years: "2001-2005" },
            { model: "RG1", weight: 1560, years: "2005-2009" },
            { model: "RG2", weight: 1610, years: "2005-2009" },
            { model: "RK1", weight: 1590, years: "2009-2015" },
            { model: "RK2", weight: 1640, years: "2009-2015" },
            { model: "RP1", weight: 1660, years: "2015-2022" },
            { model: "RP2", weight: 1710, years: "2015-2022" },
            { model: "RP3", weight: 1680, years: "2015-2022" },
            { model: "RP5", weight: 1790, years: "2017-2022" },
            { model: "RP8", weight: 1710, years: "2022-" }
        ],
        "オデッセイ": [
            { model: "RA1", weight: 1510, years: "1994-1999" },
            { model: "RA2", weight: 1560, years: "1994-1999" },
            { model: "RA6", weight: 1570, years: "1999-2003" },
            { model: "RA7", weight: 1620, years: "1999-2003" },
            { model: "RB1", weight: 1630, years: "2003-2008" },
            { model: "RB2", weight: 1680, years: "2003-2008" },
            { model: "RB3", weight: 1670, years: "2008-2013" },
            { model: "RB4", weight: 1720, years: "2008-2013" },
            { model: "RC1", weight: 1770, years: "2013-2021" },
            { model: "RC2", weight: 1820, years: "2013-2021" },
            { model: "RC4", weight: 1890, years: "2016-2021" }
        ],
        "インサイト": [
            { model: "ZE1", weight: 860, years: "1999-2006" },
            { model: "ZE2", weight: 1190, years: "2009-2014" },
            { model: "ZE3", weight: 1210, years: "2011-2014" },
            { model: "ZE4", weight: 1370, years: "2018-2022" }
        ],
        "レジェンド": [
            { model: "KA7", weight: 1650, years: "1990-1995" },
            { model: "KA9", weight: 1700, years: "1996-2004" },
            { model: "KB1", weight: 1810, years: "2004-2012" },
            { model: "KC2", weight: 1880, years: "2015-2021" }
        ],
        "S2000": [
            { model: "AP1", weight: 1240, years: "1999-2005" },
            { model: "AP2", weight: 1260, years: "2005-2009" }
        ],
        "NSX": [
            { model: "NA1", weight: 1350, years: "1990-2001" },
            { model: "NA2", weight: 1380, years: "2001-2005" },
            { model: "NC1", weight: 1780, years: "2017-2022" }
        ],
        "N-BOX": [
            { model: "JF1", weight: 930, years: "2011-2017", isKei: true },
            { model: "JF2", weight: 980, years: "2011-2017", isKei: true },
            { model: "JF3", weight: 890, years: "2017-2023", isKei: true },
            { model: "JF4", weight: 940, years: "2017-2023", isKei: true },
            { model: "JF5", weight: 900, years: "2023-", isKei: true },
            { model: "JF6", weight: 950, years: "2023-", isKei: true }
        ],
        "N-WGN": [
            { model: "JH1", weight: 830, years: "2013-2019", isKei: true },
            { model: "JH2", weight: 880, years: "2013-2019", isKei: true },
            { model: "JH3", weight: 850, years: "2019-", isKei: true },
            { model: "JH4", weight: 900, years: "2019-", isKei: true }
        ],
        "N-ONE": [
            { model: "JG1", weight: 830, years: "2012-2020", isKei: true },
            { model: "JG2", weight: 880, years: "2012-2020", isKei: true },
            { model: "JG3", weight: 840, years: "2020-", isKei: true },
            { model: "JG4", weight: 890, years: "2020-", isKei: true }
        ],
        "ライフ": [
            { model: "JB1", weight: 780, years: "1998-2003", isKei: true },
            { model: "JB5", weight: 820, years: "2003-2008", isKei: true },
            { model: "JC1", weight: 840, years: "2008-2014", isKei: true }
        ],
        "ゼスト": [
            { model: "JE1", weight: 870, years: "2006-2012", isKei: true },
            { model: "JE2", weight: 920, years: "2006-2012", isKei: true }
        ],
        // 追加車種（1980年代〜2000年代）
        "プレリュード": [
            { model: "AB", weight: 1050, years: "1982-1987" },
            { model: "BA4", weight: 1150, years: "1987-1991" },
            { model: "BA8", weight: 1230, years: "1991-1996" },
            { model: "BB5", weight: 1270, years: "1996-2001" },
            { model: "BB6", weight: 1290, years: "1996-2001" },
            { model: "BB8", weight: 1310, years: "1996-2001" }
        ],
        "インテグラ": [
            { model: "DA1", weight: 970, years: "1985-1989" },
            { model: "DA6", weight: 1070, years: "1989-1993" },
            { model: "DA8", weight: 1090, years: "1989-1993" },
            { model: "DB6", weight: 1130, years: "1993-2001" },
            { model: "DB8", weight: 1150, years: "1993-2001" },
            { model: "DC1", weight: 1100, years: "1993-2001" },
            { model: "DC2", weight: 1140, years: "1993-2001" },
            { model: "DC5", weight: 1200, years: "2001-2006" }
        ],
        "インテグラタイプR": [
            { model: "DC2", weight: 1100, years: "1995-2001" },
            { model: "DB8", weight: 1120, years: "1998-2001" },
            { model: "DC5", weight: 1180, years: "2001-2006" }
        ],
        "トルネオ": [
            { model: "CF3", weight: 1290, years: "1997-2002" },
            { model: "CF4", weight: 1320, years: "1997-2002" },
            { model: "CF5", weight: 1350, years: "1997-2002" },
            { model: "CL1", weight: 1380, years: "2000-2002" }
        ],
        "アコードワゴン": [
            { model: "CE1", weight: 1350, years: "1994-1997" },
            { model: "CF6", weight: 1400, years: "1997-2002" },
            { model: "CF7", weight: 1420, years: "1997-2002" },
            { model: "CM1", weight: 1450, years: "2002-2008" },
            { model: "CM2", weight: 1480, years: "2002-2008" },
            { model: "CM3", weight: 1500, years: "2002-2008" }
        ],
        "アスコット": [
            { model: "CB1", weight: 1180, years: "1989-1993" },
            { model: "CB3", weight: 1220, years: "1989-1993" },
            { model: "CE4", weight: 1280, years: "1993-1997" },
            { model: "CE5", weight: 1310, years: "1993-1997" }
        ],
        "ラファーガ": [
            { model: "CE4", weight: 1280, years: "1993-1997" },
            { model: "CE5", weight: 1310, years: "1993-1997" }
        ],
        "インスパイア": [
            { model: "CB5", weight: 1350, years: "1989-1995" },
            { model: "UA1", weight: 1420, years: "1995-1998" },
            { model: "UA2", weight: 1450, years: "1995-1998" },
            { model: "UA4", weight: 1480, years: "1998-2003" },
            { model: "UA5", weight: 1510, years: "1998-2003" },
            { model: "UC1", weight: 1550, years: "2003-2007" },
            { model: "CP3", weight: 1620, years: "2007-2012" }
        ],
        "セイバー": [
            { model: "UA1", weight: 1420, years: "1995-1998" },
            { model: "UA2", weight: 1450, years: "1995-1998" },
            { model: "UA4", weight: 1480, years: "1998-2003" },
            { model: "UA5", weight: 1510, years: "1998-2003" }
        ],
        "ビガー": [
            { model: "CA3", weight: 1180, years: "1985-1989" },
            { model: "CB5", weight: 1280, years: "1989-1995" },
            { model: "CC2", weight: 1320, years: "1991-1995" },
            { model: "CC3", weight: 1350, years: "1991-1995" }
        ],
        "アヴァンシア": [
            { model: "TA1", weight: 1550, years: "1999-2003" },
            { model: "TA2", weight: 1590, years: "1999-2003" },
            { model: "TA3", weight: 1620, years: "1999-2003" },
            { model: "TA4", weight: 1660, years: "1999-2003" }
        ],
        "エリシオン": [
            { model: "RR1", weight: 1820, years: "2004-2013" },
            { model: "RR2", weight: 1870, years: "2004-2013" },
            { model: "RR3", weight: 1890, years: "2004-2013" },
            { model: "RR4", weight: 1920, years: "2004-2013" },
            { model: "RR5", weight: 1950, years: "2007-2013" },
            { model: "RR6", weight: 1980, years: "2007-2013" }
        ],
        "ラグレイト": [
            { model: "RL1", weight: 1920, years: "1999-2004" }
        ],
        "クロスロード": [
            { model: "RT1", weight: 1580, years: "2007-2010" },
            { model: "RT2", weight: 1630, years: "2007-2010" },
            { model: "RT3", weight: 1650, years: "2007-2010" },
            { model: "RT4", weight: 1700, years: "2007-2010" }
        ],
        "HR-V": [
            { model: "GH1", weight: 1180, years: "1998-2006" },
            { model: "GH2", weight: 1220, years: "1998-2006" },
            { model: "GH3", weight: 1250, years: "1998-2006" },
            { model: "GH4", weight: 1290, years: "1998-2006" }
        ],
        "エレメント": [
            { model: "YH2", weight: 1550, years: "2003-2011" }
        ],
        "パートナー": [
            { model: "EY6", weight: 1050, years: "1996-2006" },
            { model: "EY7", weight: 1080, years: "1996-2006" },
            { model: "EY8", weight: 1100, years: "1996-2006" },
            { model: "GJ3", weight: 1070, years: "2006-" },
            { model: "GJ4", weight: 1110, years: "2006-" }
        ],
        "ロゴ": [
            { model: "GA3", weight: 920, years: "1996-2001" },
            { model: "GA5", weight: 950, years: "1996-2001" }
        ],
        "キャパ": [
            { model: "GA4", weight: 1020, years: "1998-2002" },
            { model: "GA6", weight: 1050, years: "1998-2002" }
        ],
        "シティ": [
            { model: "GA1", weight: 720, years: "1986-1988" },
            { model: "GA2", weight: 780, years: "1986-1994" }
        ],
        "トゥデイ": [
            { model: "JW1", weight: 600, years: "1985-1988", isKei: true },
            { model: "JW2", weight: 620, years: "1988-1993", isKei: true },
            { model: "JA4", weight: 680, years: "1993-1998", isKei: true },
            { model: "JA5", weight: 700, years: "1993-1998", isKei: true }
        ],
        "ビート": [
            { model: "PP1", weight: 760, years: "1991-1996", isKei: true }
        ],
        "アクティ": [
            { model: "HA3", weight: 780, years: "1988-1999", isKei: true },
            { model: "HA4", weight: 800, years: "1988-1999", isKei: true },
            { model: "HA6", weight: 860, years: "1999-2009", isKei: true },
            { model: "HA7", weight: 880, years: "1999-2018", isKei: true },
            { model: "HA8", weight: 900, years: "2009-2021", isKei: true },
            { model: "HA9", weight: 920, years: "2009-2021", isKei: true }
        ],
        "バモス": [
            { model: "HM1", weight: 950, years: "1999-2018", isKei: true },
            { model: "HM2", weight: 990, years: "1999-2018", isKei: true }
        ],
        "バモスホビオ": [
            { model: "HM3", weight: 970, years: "2003-2018", isKei: true },
            { model: "HM4", weight: 1010, years: "2003-2018", isKei: true }
        ],
        "S660": [
            { model: "JW5", weight: 830, years: "2015-2022", isKei: true }
        ]
    },
    "日産": {
        "ノート": [
            { model: "E11", weight: 1050, years: "2005-2012" },
            { model: "NE11", weight: 1090, years: "2008-2012" },
            { model: "E12", weight: 1040, years: "2012-2020" },
            { model: "NE12", weight: 1080, years: "2012-2020" },
            { model: "HE12", weight: 1210, years: "2016-2020" },
            { model: "E13", weight: 1220, years: "2020-" },
            { model: "SNE13", weight: 1340, years: "2020-" }
        ],
        "マーチ": [
            { model: "K10", weight: 660, years: "1982-1992" },
            { model: "K11", weight: 810, years: "1992-2002" },
            { model: "AK12", weight: 960, years: "2002-2010" },
            { model: "K13", weight: 930, years: "2010-2022" },
            { model: "NK13", weight: 970, years: "2013-2022" }
        ],
        "ティーダ": [
            { model: "C11", weight: 1160, years: "2004-2012" },
            { model: "NC11", weight: 1200, years: "2004-2012" },
            { model: "JC11", weight: 1180, years: "2006-2012" }
        ],
        "シルフィ": [
            { model: "TB17", weight: 1240, years: "2012-2021" }
        ],
        "スカイライン": [
            { model: "R31", weight: 1280, years: "1985-1989" },
            { model: "R32", weight: 1380, years: "1989-1994" },
            { model: "BNR32", weight: 1430, years: "1989-1994" },
            { model: "R33", weight: 1410, years: "1993-1998" },
            { model: "BCNR33", weight: 1530, years: "1995-1998" },
            { model: "R34", weight: 1410, years: "1998-2002" },
            { model: "BNR34", weight: 1560, years: "1999-2002" },
            { model: "V35", weight: 1470, years: "2001-2006" },
            { model: "V36", weight: 1640, years: "2006-2014" },
            { model: "HV37", weight: 1820, years: "2014-" },
            { model: "RV37", weight: 1700, years: "2019-" }
        ],
        "GT-R": [
            { model: "R35", weight: 1740, years: "2007-" }
        ],
        "フェアレディZ": [
            { model: "Z31", weight: 1350, years: "1983-1989" },
            { model: "Z32", weight: 1480, years: "1989-2000" },
            { model: "Z33", weight: 1430, years: "2002-2008" },
            { model: "Z34", weight: 1480, years: "2008-2022" },
            { model: "RZ34", weight: 1570, years: "2022-" }
        ],
        "セレナ": [
            { model: "C23", weight: 1500, years: "1991-1999" },
            { model: "C24", weight: 1540, years: "1999-2005" },
            { model: "C25", weight: 1570, years: "2005-2010" },
            { model: "C26", weight: 1590, years: "2010-2016" },
            { model: "C27", weight: 1650, years: "2016-2022" },
            { model: "GC27", weight: 1690, years: "2016-2022" },
            { model: "GFC27", weight: 1730, years: "2018-2022" },
            { model: "C28", weight: 1790, years: "2022-" }
        ],
        "エルグランド": [
            { model: "E50", weight: 1980, years: "1997-2002" },
            { model: "E51", weight: 2010, years: "2002-2010" },
            { model: "E52", weight: 1940, years: "2010-" },
            { model: "PE52", weight: 2020, years: "2010-" },
            { model: "TE52", weight: 2070, years: "2010-" }
        ],
        "エクストレイル": [
            { model: "T30", weight: 1380, years: "2000-2007" },
            { model: "NT30", weight: 1420, years: "2000-2007" },
            { model: "T31", weight: 1420, years: "2007-2013" },
            { model: "NT31", weight: 1460, years: "2007-2013" },
            { model: "DNT31", weight: 1510, years: "2008-2013" },
            { model: "T32", weight: 1450, years: "2013-2022" },
            { model: "NT32", weight: 1490, years: "2013-2022" },
            { model: "HT32", weight: 1580, years: "2015-2022" },
            { model: "T33", weight: 1740, years: "2022-" }
        ],
        "キックス": [
            { model: "P15", weight: 1350, years: "2020-" },
            { model: "SNP15", weight: 1470, years: "2022-" }
        ],
        "ジューク": [
            { model: "F15", weight: 1200, years: "2010-2019" },
            { model: "NF15", weight: 1240, years: "2010-2019" },
            { model: "YF15", weight: 1350, years: "2013-2019" }
        ],
        "ムラーノ": [
            { model: "Z50", weight: 1730, years: "2004-2008" },
            { model: "PZ50", weight: 1800, years: "2004-2008" },
            { model: "Z51", weight: 1750, years: "2008-2015" },
            { model: "PNZ51", weight: 1820, years: "2008-2015" }
        ],
        "リーフ": [
            { model: "ZE0", weight: 1460, years: "2010-2017" },
            { model: "AZE0", weight: 1490, years: "2012-2017" },
            { model: "ZE1", weight: 1520, years: "2017-" }
        ],
        "アリア": [
            { model: "FE0", weight: 1920, years: "2022-" }
        ],
        "デイズ": [
            { model: "B21W", weight: 830, years: "2013-2019", isKei: true },
            { model: "B40W", weight: 840, years: "2019-", isKei: true },
            { model: "B43W", weight: 890, years: "2019-", isKei: true },
            { model: "B44W", weight: 880, years: "2019-", isKei: true }
        ],
        "ルークス": [
            { model: "B44A", weight: 950, years: "2020-", isKei: true },
            { model: "B45A", weight: 1000, years: "2020-", isKei: true },
            { model: "B47A", weight: 960, years: "2020-", isKei: true }
        ],
        "サクラ": [
            { model: "B6AW", weight: 1070, years: "2022-", isKei: true }
        ],
        "モコ": [
            { model: "MG21S", weight: 790, years: "2002-2006", isKei: true },
            { model: "MG22S", weight: 820, years: "2006-2011", isKei: true },
            { model: "MG33S", weight: 810, years: "2011-2016", isKei: true }
        ],
        // 追加車種（1980年代〜2000年代）
        "シルビア": [
            { model: "S12", weight: 1100, years: "1983-1988" },
            { model: "S13", weight: 1150, years: "1988-1993" },
            { model: "PS13", weight: 1180, years: "1991-1993" },
            { model: "KS13", weight: 1200, years: "1989-1993" },
            { model: "S14", weight: 1220, years: "1993-1998" },
            { model: "KS14", weight: 1280, years: "1993-1998" },
            { model: "S15", weight: 1200, years: "1999-2002" }
        ],
        "180SX": [
            { model: "RS13", weight: 1180, years: "1989-1998" },
            { model: "RPS13", weight: 1220, years: "1991-1998" },
            { model: "KRPS13", weight: 1250, years: "1991-1998" }
        ],
        "サニー": [
            { model: "B12", weight: 850, years: "1985-1990" },
            { model: "B13", weight: 940, years: "1990-1994" },
            { model: "B14", weight: 1000, years: "1994-1998" },
            { model: "B15", weight: 1070, years: "1998-2004" },
            { model: "FB15", weight: 1100, years: "1998-2004" },
            { model: "QB15", weight: 1130, years: "2000-2004" }
        ],
        "パルサー": [
            { model: "N13", weight: 880, years: "1986-1990" },
            { model: "N14", weight: 980, years: "1990-1995" },
            { model: "N15", weight: 1020, years: "1995-2000" },
            { model: "FN15", weight: 1050, years: "1995-2000" }
        ],
        "ブルーバード": [
            { model: "U11", weight: 1080, years: "1983-1987" },
            { model: "U12", weight: 1150, years: "1987-1991" },
            { model: "U13", weight: 1200, years: "1991-1995" },
            { model: "U14", weight: 1250, years: "1995-2001" },
            { model: "EU14", weight: 1280, years: "1995-2001" },
            { model: "HU14", weight: 1310, years: "1997-2001" }
        ],
        "ブルーバードシルフィ": [
            { model: "QG10", weight: 1170, years: "2000-2005" },
            { model: "TG10", weight: 1220, years: "2000-2005" },
            { model: "G11", weight: 1220, years: "2005-2012" },
            { model: "KG11", weight: 1280, years: "2005-2012" },
            { model: "TB17", weight: 1270, years: "2012-2020" }
        ],
        "ローレル": [
            { model: "C32", weight: 1320, years: "1984-1988" },
            { model: "C33", weight: 1350, years: "1988-1993" },
            { model: "C34", weight: 1380, years: "1993-1997" },
            { model: "C35", weight: 1400, years: "1997-2002" },
            { model: "HC35", weight: 1450, years: "1997-2002" },
            { model: "GC35", weight: 1480, years: "1997-2002" }
        ],
        "セフィーロ": [
            { model: "A31", weight: 1300, years: "1988-1994" },
            { model: "A32", weight: 1380, years: "1994-1998" },
            { model: "A33", weight: 1420, years: "1998-2003" },
            { model: "PA33", weight: 1480, years: "1998-2003" }
        ],
        "プリメーラ": [
            { model: "P10", weight: 1150, years: "1990-1995" },
            { model: "HP10", weight: 1200, years: "1992-1995" },
            { model: "P11", weight: 1220, years: "1995-2001" },
            { model: "HP11", weight: 1280, years: "1997-2001" },
            { model: "P12", weight: 1320, years: "2001-2005" },
            { model: "TP12", weight: 1380, years: "2001-2005" },
            { model: "HP12", weight: 1400, years: "2001-2005" }
        ],
        "プリメーラワゴン": [
            { model: "WP11", weight: 1320, years: "1997-2001" },
            { model: "WHP11", weight: 1380, years: "1997-2001" },
            { model: "WTP12", weight: 1420, years: "2001-2005" },
            { model: "WRP12", weight: 1450, years: "2001-2005" }
        ],
        "アベニール": [
            { model: "W10", weight: 1180, years: "1990-1998" },
            { model: "PW10", weight: 1240, years: "1990-1998" },
            { model: "W11", weight: 1280, years: "1998-2005" },
            { model: "PW11", weight: 1340, years: "1998-2005" }
        ],
        "ウイングロード": [
            { model: "Y10", weight: 1100, years: "1996-1999" },
            { model: "Y11", weight: 1140, years: "1999-2005" },
            { model: "WFY11", weight: 1200, years: "1999-2005" },
            { model: "Y12", weight: 1180, years: "2005-2018" },
            { model: "NY12", weight: 1230, years: "2005-2018" },
            { model: "JY12", weight: 1250, years: "2005-2018" }
        ],
        "ADバン": [
            { model: "VY10", weight: 970, years: "1990-1999" },
            { model: "VY11", weight: 1020, years: "1999-2006" },
            { model: "VY12", weight: 1060, years: "2006-" },
            { model: "VJY12", weight: 1110, years: "2006-" }
        ],
        "NXクーペ": [
            { model: "B13", weight: 1000, years: "1990-1994" },
            { model: "EB13", weight: 1050, years: "1992-1994" }
        ],
        "プレセア": [
            { model: "R10", weight: 1100, years: "1990-1995" },
            { model: "R11", weight: 1150, years: "1995-2000" },
            { model: "HR11", weight: 1200, years: "1997-2000" }
        ],
        "レパード": [
            { model: "F30", weight: 1400, years: "1986-1992" },
            { model: "JF31", weight: 1480, years: "1986-1992" },
            { model: "UF31", weight: 1520, years: "1986-1992" },
            { model: "JPY32", weight: 1620, years: "1992-1996" },
            { model: "JY33", weight: 1680, years: "1996-1999" }
        ],
        "インフィニティQ45": [
            { model: "G50", weight: 1780, years: "1989-1997" },
            { model: "HG50", weight: 1820, years: "1989-1997" }
        ],
        "フーガ": [
            { model: "Y50", weight: 1650, years: "2004-2009" },
            { model: "PY50", weight: 1730, years: "2004-2009" },
            { model: "GY50", weight: 1800, years: "2004-2009" },
            { model: "Y51", weight: 1720, years: "2009-2022" },
            { model: "HY51", weight: 1860, years: "2010-2022" }
        ],
        "シーマ": [
            { model: "FGY32", weight: 1750, years: "1991-1996" },
            { model: "FGNY32", weight: 1820, years: "1991-1996" },
            { model: "FGY33", weight: 1780, years: "1996-2001" },
            { model: "HGY51", weight: 1970, years: "2012-2022" }
        ],
        "プレジデント": [
            { model: "JG50", weight: 1920, years: "1990-2002" },
            { model: "PHG50", weight: 2020, years: "1990-2002" },
            { model: "PGF50", weight: 2080, years: "2003-2010" }
        ],
        "バサラ": [
            { model: "JU30", weight: 1620, years: "1999-2003" },
            { model: "JNU30", weight: 1680, years: "1999-2003" },
            { model: "JTU30", weight: 1700, years: "1999-2003" },
            { model: "JTNU30", weight: 1740, years: "1999-2003" }
        ],
        "プレサージュ": [
            { model: "U30", weight: 1620, years: "1998-2003" },
            { model: "NU30", weight: 1680, years: "1998-2003" },
            { model: "TU30", weight: 1700, years: "1998-2003" },
            { model: "U31", weight: 1740, years: "2003-2009" },
            { model: "TU31", weight: 1820, years: "2003-2009" },
            { model: "PU31", weight: 1880, years: "2003-2009" }
        ],
        "ラルゴ": [
            { model: "W30", weight: 1640, years: "1993-1999" },
            { model: "VW30", weight: 1720, years: "1993-1999" },
            { model: "NW30", weight: 1680, years: "1993-1999" }
        ],
        "セレナカーゴ": [
            { model: "VNC24", weight: 1580, years: "2001-2005" }
        ],
        "キャラバン": [
            { model: "E24", weight: 1680, years: "1986-2001" },
            { model: "E25", weight: 1720, years: "2001-2012" },
            { model: "E26", weight: 1820, years: "2012-" }
        ],
        "テラノ": [
            { model: "WD21", weight: 1680, years: "1986-1995" },
            { model: "R50", weight: 1820, years: "1995-2002" },
            { model: "PR50", weight: 1920, years: "1999-2002" }
        ],
        "テラノレグラス": [
            { model: "JRR50", weight: 1950, years: "1996-2002" },
            { model: "JTR50", weight: 2020, years: "1996-2002" }
        ],
        "サファリ": [
            { model: "Y60", weight: 2020, years: "1987-1997" },
            { model: "Y61", weight: 2150, years: "1997-2007" },
            { model: "WRGY61", weight: 2280, years: "1997-2007" }
        ],
        "ラシーン": [
            { model: "RKNB14", weight: 1150, years: "1994-2000" },
            { model: "RFNB14", weight: 1200, years: "1994-2000" }
        ],
        "キューブ": [
            { model: "Z10", weight: 1010, years: "1998-2002" },
            { model: "AZ10", weight: 1050, years: "1998-2002" },
            { model: "BZ11", weight: 1080, years: "2002-2008" },
            { model: "BGZ11", weight: 1120, years: "2002-2008" },
            { model: "Z12", weight: 1150, years: "2008-2020" },
            { model: "NZ12", weight: 1200, years: "2008-2020" }
        ],
        "キューブキュービック": [
            { model: "BGZ11", weight: 1150, years: "2003-2008" },
            { model: "YGZ11", weight: 1200, years: "2003-2008" }
        ],
        "ティーダ": [
            { model: "C11", weight: 1130, years: "2004-2012" },
            { model: "NC11", weight: 1180, years: "2004-2012" },
            { model: "JC11", weight: 1200, years: "2004-2012" }
        ],
        "ティーダラティオ": [
            { model: "SC11", weight: 1100, years: "2004-2012" },
            { model: "SNC11", weight: 1150, years: "2004-2012" },
            { model: "SJC11", weight: 1180, years: "2006-2012" }
        ],
        "ラティオ": [
            { model: "N17", weight: 1030, years: "2012-2016" }
        ],
        "フェアレディZ": [
            { model: "Z31", weight: 1350, years: "1983-1989" },
            { model: "GZ31", weight: 1400, years: "1983-1989" },
            { model: "HZ31", weight: 1380, years: "1983-1989" },
            { model: "Z32", weight: 1480, years: "1989-2000" },
            { model: "GZ32", weight: 1550, years: "1989-2000" },
            { model: "GCZ32", weight: 1580, years: "1989-2000" },
            { model: "HZ33", weight: 1450, years: "2002-2008" },
            { model: "Z33", weight: 1420, years: "2002-2008" },
            { model: "Z34", weight: 1490, years: "2008-" },
            { model: "HZ34", weight: 1520, years: "2008-" },
            { model: "Z35", weight: 1570, years: "2022-" }
        ],
        "スカイライン": [
            { model: "R31", weight: 1200, years: "1985-1989" },
            { model: "HR31", weight: 1280, years: "1985-1989" },
            { model: "R32", weight: 1280, years: "1989-1994" },
            { model: "HCR32", weight: 1350, years: "1989-1994" },
            { model: "HNR32", weight: 1420, years: "1989-1994" },
            { model: "R33", weight: 1350, years: "1993-1998" },
            { model: "ECR33", weight: 1410, years: "1993-1998" },
            { model: "ER33", weight: 1380, years: "1993-1998" },
            { model: "R34", weight: 1310, years: "1998-2002" },
            { model: "ER34", weight: 1440, years: "1998-2002" },
            { model: "HR34", weight: 1380, years: "1998-2002" },
            { model: "V35", weight: 1480, years: "2001-2006" },
            { model: "CPV35", weight: 1520, years: "2003-2006" },
            { model: "V36", weight: 1640, years: "2006-2014" },
            { model: "KV36", weight: 1700, years: "2006-2014" },
            { model: "PV36", weight: 1750, years: "2007-2014" },
            { model: "HV37", weight: 1780, years: "2014-" },
            { model: "YV37", weight: 1820, years: "2017-" },
            { model: "RV37", weight: 1760, years: "2019-" }
        ],
        "GT-R": [
            { model: "BNR32", weight: 1430, years: "1989-1994" },
            { model: "BCNR33", weight: 1530, years: "1995-1998" },
            { model: "BNR34", weight: 1560, years: "1999-2002" },
            { model: "R35", weight: 1740, years: "2007-" }
        ]
    },
    "マツダ": {
        "MAZDA2": [
            { model: "DJ3FS", weight: 1020, years: "2019-" },
            { model: "DJ5FS", weight: 1050, years: "2019-" },
            { model: "DJLFS", weight: 1110, years: "2019-" }
        ],
        "デミオ": [
            { model: "DW3W", weight: 920, years: "1996-2002" },
            { model: "DW5W", weight: 950, years: "1996-2002" },
            { model: "DY3W", weight: 970, years: "2002-2007" },
            { model: "DY5W", weight: 1000, years: "2002-2007" },
            { model: "DE3FS", weight: 1000, years: "2007-2014" },
            { model: "DE5FS", weight: 1030, years: "2007-2014" },
            { model: "DJ3FS", weight: 1000, years: "2014-2019" },
            { model: "DJ5FS", weight: 1030, years: "2014-2019" }
        ],
        "MAZDA3": [
            { model: "BP5P", weight: 1320, years: "2019-" },
            { model: "BP8P", weight: 1380, years: "2019-" },
            { model: "BPEP", weight: 1420, years: "2019-" },
            { model: "BPFP", weight: 1410, years: "2019-" }
        ],
        "アクセラ": [
            { model: "BK3P", weight: 1220, years: "2003-2009" },
            { model: "BK5P", weight: 1280, years: "2003-2009" },
            { model: "BL5FW", weight: 1310, years: "2009-2013" },
            { model: "BLEFW", weight: 1350, years: "2009-2013" },
            { model: "BM5FP", weight: 1280, years: "2013-2019" },
            { model: "BYEFP", weight: 1410, years: "2013-2019" }
        ],
        "MAZDA6": [
            { model: "GJ2FP", weight: 1500, years: "2019-" },
            { model: "GJ5FP", weight: 1530, years: "2019-" },
            { model: "GJEFP", weight: 1640, years: "2019-" }
        ],
        "アテンザ": [
            { model: "GG3S", weight: 1310, years: "2002-2008" },
            { model: "GGEP", weight: 1400, years: "2002-2008" },
            { model: "GH5FP", weight: 1440, years: "2008-2012" },
            { model: "GHEFP", weight: 1490, years: "2008-2012" },
            { model: "GJ2FP", weight: 1470, years: "2012-2019" },
            { model: "GJ5FP", weight: 1510, years: "2012-2019" }
        ],
        "CX-3": [
            { model: "DK5FW", weight: 1240, years: "2015-" },
            { model: "DK5AW", weight: 1290, years: "2015-" },
            { model: "DK8FW", weight: 1200, years: "2018-" }
        ],
        "CX-30": [
            { model: "DM8P", weight: 1380, years: "2019-" },
            { model: "DMEP", weight: 1450, years: "2019-" },
            { model: "DMFP", weight: 1450, years: "2020-" }
        ],
        "CX-5": [
            { model: "KE2FW", weight: 1440, years: "2012-2017" },
            { model: "KE5FW", weight: 1480, years: "2012-2017" },
            { model: "KEEFW", weight: 1540, years: "2012-2017" },
            { model: "KF2P", weight: 1510, years: "2017-" },
            { model: "KF5P", weight: 1550, years: "2017-" },
            { model: "KFEP", weight: 1620, years: "2017-" }
        ],
        "CX-60": [
            { model: "KH3P", weight: 1860, years: "2022-" },
            { model: "KH5P", weight: 1920, years: "2022-" }
        ],
        "CX-8": [
            { model: "KG2P", weight: 1710, years: "2017-2023" },
            { model: "KG5P", weight: 1760, years: "2017-2023" }
        ],
        "ロードスター": [
            { model: "NA6CE", weight: 940, years: "1989-1993" },
            { model: "NA8C", weight: 990, years: "1993-1998" },
            { model: "NB6C", weight: 1010, years: "1998-2005" },
            { model: "NB8C", weight: 1030, years: "1998-2005" },
            { model: "NCEC", weight: 1090, years: "2005-2015" },
            { model: "ND5RC", weight: 990, years: "2015-" },
            { model: "NDERC", weight: 1060, years: "2016-" }
        ],
        "RX-7": [
            { model: "FC3S", weight: 1220, years: "1985-1992" },
            { model: "FD3S", weight: 1260, years: "1991-2002" }
        ],
        "RX-8": [
            { model: "SE3P", weight: 1310, years: "2003-2012" }
        ],
        "フレア": [
            { model: "MJ34S", weight: 780, years: "2012-2017", isKei: true },
            { model: "MJ44S", weight: 810, years: "2015-2017", isKei: true },
            { model: "MJ55S", weight: 790, years: "2017-2020", isKei: true },
            { model: "MJ95S", weight: 810, years: "2020-", isKei: true }
        ],
        "フレアワゴン": [
            { model: "MM32S", weight: 840, years: "2013-2018", isKei: true },
            { model: "MM42S", weight: 880, years: "2015-2018", isKei: true },
            { model: "MM53S", weight: 870, years: "2018-", isKei: true }
        ],
        "フレアクロスオーバー": [
            { model: "MS31S", weight: 870, years: "2014-2020", isKei: true },
            { model: "MS52S", weight: 820, years: "2020-", isKei: true }
        ]
    },
    "スバル": {
        "インプレッサ": [
            { model: "GC8", weight: 1200, years: "1992-2000" },
            { model: "GF8", weight: 1230, years: "1992-2000" },
            { model: "GD9", weight: 1290, years: "2000-2007" },
            { model: "GDA", weight: 1350, years: "2000-2007" },
            { model: "GE7", weight: 1280, years: "2007-2011" },
            { model: "GH8", weight: 1350, years: "2007-2011" },
            { model: "GP7", weight: 1290, years: "2011-2016" },
            { model: "GJ7", weight: 1270, years: "2011-2016" },
            { model: "GK7", weight: 1300, years: "2016-2023" },
            { model: "GT7", weight: 1340, years: "2016-2023" },
            { model: "GU7", weight: 1340, years: "2023-" }
        ],
        "WRX STI": [
            { model: "GC8", weight: 1260, years: "1994-2000" },
            { model: "GDB", weight: 1430, years: "2000-2007" },
            { model: "GRB", weight: 1480, years: "2007-2014" },
            { model: "VAB", weight: 1490, years: "2014-2019" }
        ],
        "WRX S4": [
            { model: "VAG", weight: 1540, years: "2014-2021" },
            { model: "VBH", weight: 1580, years: "2021-" }
        ],
        "レガシィ": [
            { model: "BC5", weight: 1200, years: "1989-1993" },
            { model: "BD5", weight: 1360, years: "1993-1998" },
            { model: "BE5", weight: 1380, years: "1998-2003" },
            { model: "BL5", weight: 1400, years: "2003-2009" },
            { model: "BM9", weight: 1480, years: "2009-2014" },
            { model: "BN9", weight: 1510, years: "2014-2020" }
        ],
        "レガシィアウトバック": [
            { model: "BP9", weight: 1500, years: "2003-2009" },
            { model: "BR9", weight: 1540, years: "2009-2014" },
            { model: "BS9", weight: 1570, years: "2014-2021" },
            { model: "BT5", weight: 1680, years: "2021-" }
        ],
        "レヴォーグ": [
            { model: "VM4", weight: 1490, years: "2014-2020" },
            { model: "VMG", weight: 1540, years: "2014-2020" },
            { model: "VN5", weight: 1550, years: "2020-" }
        ],
        "フォレスター": [
            { model: "SF5", weight: 1370, years: "1997-2002" },
            { model: "SG5", weight: 1410, years: "2002-2007" },
            { model: "SH5", weight: 1450, years: "2007-2012" },
            { model: "SJ5", weight: 1470, years: "2012-2018" },
            { model: "SK9", weight: 1530, years: "2018-" },
            { model: "SKE", weight: 1640, years: "2018-" }
        ],
        "XV": [
            { model: "GP7", weight: 1400, years: "2012-2017" },
            { model: "GT7", weight: 1410, years: "2017-2022" },
            { model: "GTE", weight: 1530, years: "2019-2022" }
        ],
        "クロストレック": [
            { model: "GU", weight: 1540, years: "2022-" }
        ],
        "BRZ": [
            { model: "ZC6", weight: 1230, years: "2012-2021" },
            { model: "ZD8", weight: 1270, years: "2021-" }
        ],
        "ソルテラ": [
            { model: "XEAM10", weight: 1930, years: "2022-" }
        ],
        "サンバー": [
            { model: "TT1", weight: 900, years: "1999-2012", isKei: true },
            { model: "TT2", weight: 950, years: "1999-2012", isKei: true },
            { model: "S321B", weight: 950, years: "2012-", isKei: true }
        ],
        "プレオ": [
            { model: "RA1", weight: 780, years: "1998-2010", isKei: true },
            { model: "L275F", weight: 810, years: "2010-2017", isKei: true }
        ],
        "ステラ": [
            { model: "RN1", weight: 830, years: "2006-2011", isKei: true },
            { model: "LA100F", weight: 820, years: "2011-2014", isKei: true },
            { model: "LA150F", weight: 820, years: "2014-", isKei: true }
        ],
        // 追加車種（1980年代〜2000年代）
        "レオーネ": [
            { model: "AA2", weight: 1020, years: "1984-1994" },
            { model: "AA3", weight: 1080, years: "1984-1994" },
            { model: "AA5", weight: 1100, years: "1984-1994" }
        ],
        "アルシオーネ": [
            { model: "AX7", weight: 1280, years: "1985-1991" },
            { model: "AX9", weight: 1350, years: "1988-1991" }
        ],
        "アルシオーネSVX": [
            { model: "CXW", weight: 1620, years: "1991-1996" },
            { model: "CXD", weight: 1680, years: "1991-1996" }
        ],
        "レガシィツーリングワゴン": [
            { model: "BF5", weight: 1280, years: "1989-1993" },
            { model: "BG5", weight: 1400, years: "1993-1998" },
            { model: "BH5", weight: 1420, years: "1998-2003" },
            { model: "BP5", weight: 1450, years: "2003-2009" },
            { model: "BP9", weight: 1480, years: "2003-2009" },
            { model: "BRM", weight: 1530, years: "2009-2014" },
            { model: "BRG", weight: 1560, years: "2009-2014" }
        ],
        "レガシィB4": [
            { model: "BE5", weight: 1380, years: "1998-2003" },
            { model: "BE9", weight: 1420, years: "2001-2003" },
            { model: "BL5", weight: 1400, years: "2003-2009" },
            { model: "BLE", weight: 1520, years: "2006-2009" },
            { model: "BM9", weight: 1480, years: "2009-2014" },
            { model: "BMG", weight: 1540, years: "2012-2014" },
            { model: "BN9", weight: 1510, years: "2014-2020" }
        ],
        "エクシーガ": [
            { model: "YA5", weight: 1520, years: "2008-2015" },
            { model: "YA9", weight: 1550, years: "2009-2015" },
            { model: "YAM", weight: 1580, years: "2012-2018" }
        ],
        "トレジア": [
            { model: "NCP120X", weight: 1150, years: "2010-2016" },
            { model: "NSP120X", weight: 1080, years: "2010-2016" }
        ],
        "DEX": [
            { model: "M401F", weight: 1020, years: "2008-2010" },
            { model: "M411F", weight: 1070, years: "2008-2010" }
        ],
        "R2": [
            { model: "RC1", weight: 780, years: "2003-2010", isKei: true },
            { model: "RC2", weight: 820, years: "2003-2010", isKei: true }
        ],
        "R1": [
            { model: "RJ1", weight: 790, years: "2005-2010", isKei: true },
            { model: "RJ2", weight: 830, years: "2005-2010", isKei: true }
        ],
        "ヴィヴィオ": [
            { model: "KK3", weight: 680, years: "1992-1998", isKei: true },
            { model: "KK4", weight: 720, years: "1992-1998", isKei: true },
            { model: "KY3", weight: 700, years: "1992-1998", isKei: true }
        ],
        "プレオプラス": [
            { model: "LA300F", weight: 730, years: "2012-2017", isKei: true },
            { model: "LA350F", weight: 670, years: "2017-", isKei: true }
        ],
        "シフォン": [
            { model: "LA600F", weight: 920, years: "2016-2019", isKei: true },
            { model: "LA650F", weight: 900, years: "2019-", isKei: true }
        ],
        "ディアスワゴン": [
            { model: "TW1", weight: 980, years: "1999-2009", isKei: true },
            { model: "TW2", weight: 1020, years: "1999-2009", isKei: true }
        ],
        "ドミンゴ": [
            { model: "FA7", weight: 980, years: "1983-1994" },
            { model: "FA8", weight: 1010, years: "1983-1994" }
        ],
        "トラヴィック": [
            { model: "XM220", weight: 1620, years: "2001-2004" },
            { model: "XM182", weight: 1580, years: "2001-2004" }
        ],
        "BRZ": [
            { model: "ZC6", weight: 1230, years: "2012-2021" },
            { model: "ZD8", weight: 1270, years: "2021-" }
        ],
        "ソルテラ": [
            { model: "XEAM10", weight: 1930, years: "2022-" },
            { model: "YEAM15", weight: 2020, years: "2022-" }
        ],
        "クロストレック": [
            { model: "GUE", weight: 1560, years: "2022-" }
        ]
    },
    "スズキ": {
        "スイフト": [
            { model: "HT51S", weight: 890, years: "2000-2004" },
            { model: "ZC11S", weight: 920, years: "2004-2010" },
            { model: "ZC21S", weight: 950, years: "2004-2010" },
            { model: "ZC31S", weight: 1050, years: "2005-2010" },
            { model: "ZC72S", weight: 930, years: "2010-2017" },
            { model: "ZC32S", weight: 1040, years: "2011-2017" },
            { model: "ZC83S", weight: 890, years: "2017-" },
            { model: "ZC53S", weight: 940, years: "2017-" },
            { model: "ZC33S", weight: 970, years: "2017-" },
            { model: "ZD83S", weight: 940, years: "2017-" }
        ],
        "ソリオ": [
            { model: "MA15S", weight: 930, years: "2011-2015" },
            { model: "MA26S", weight: 950, years: "2015-2020" },
            { model: "MA36S", weight: 990, years: "2015-2020" },
            { model: "MA46S", weight: 1030, years: "2018-2020" },
            { model: "MA27S", weight: 1000, years: "2020-" },
            { model: "MA37S", weight: 1040, years: "2020-" }
        ],
        "イグニス": [
            { model: "FF21S", weight: 850, years: "2016-" },
            { model: "MF21S", weight: 880, years: "2016-" }
        ],
        "クロスビー": [
            { model: "MN71S", weight: 960, years: "2017-" }
        ],
        "エスクード": [
            { model: "TA01W", weight: 1200, years: "1988-1997" },
            { model: "TD01W", weight: 1250, years: "1988-1997" },
            { model: "TD52W", weight: 1420, years: "1997-2005" },
            { model: "TD54W", weight: 1480, years: "2005-2015" },
            { model: "YEA1S", weight: 1200, years: "2015-" },
            { model: "YD21S", weight: 1280, years: "2015-" }
        ],
        "ジムニーシエラ": [
            { model: "JB31W", weight: 1010, years: "1993-1998" },
            { model: "JB32W", weight: 1040, years: "1998-2002" },
            { model: "JB43W", weight: 1060, years: "2002-2018" },
            { model: "JB74W", weight: 1070, years: "2018-" }
        ],
        "ワゴンR": [
            { model: "CT21S", weight: 720, years: "1993-1998", isKei: true },
            { model: "MC21S", weight: 780, years: "1998-2003", isKei: true },
            { model: "MH21S", weight: 800, years: "2003-2008", isKei: true },
            { model: "MH23S", weight: 810, years: "2008-2012", isKei: true },
            { model: "MH34S", weight: 790, years: "2012-2017", isKei: true },
            { model: "MH35S", weight: 800, years: "2017-", isKei: true },
            { model: "MH55S", weight: 840, years: "2017-", isKei: true },
            { model: "MH85S", weight: 800, years: "2017-", isKei: true },
            { model: "MH95S", weight: 830, years: "2017-", isKei: true }
        ],
        "ワゴンRスマイル": [
            { model: "MX81S", weight: 880, years: "2021-", isKei: true },
            { model: "MX91S", weight: 930, years: "2021-", isKei: true }
        ],
        "スペーシア": [
            { model: "MK32S", weight: 840, years: "2013-2017", isKei: true },
            { model: "MK42S", weight: 870, years: "2015-2017", isKei: true },
            { model: "MK53S", weight: 870, years: "2017-2023", isKei: true },
            { model: "MK54S", weight: 870, years: "2023-", isKei: true }
        ],
        "ハスラー": [
            { model: "MR31S", weight: 800, years: "2014-2020", isKei: true },
            { model: "MR41S", weight: 850, years: "2015-2020", isKei: true },
            { model: "MR52S", weight: 820, years: "2020-", isKei: true },
            { model: "MR92S", weight: 870, years: "2020-", isKei: true }
        ],
        "ジムニー": [
            { model: "JA11", weight: 880, years: "1990-1995", isKei: true },
            { model: "JA12", weight: 920, years: "1995-1998", isKei: true },
            { model: "JA22", weight: 960, years: "1995-1998", isKei: true },
            { model: "JB23W", weight: 1000, years: "1998-2018", isKei: true },
            { model: "JB64W", weight: 1030, years: "2018-", isKei: true }
        ],
        "アルト": [
            { model: "HA11S", weight: 650, years: "1994-1998", isKei: true },
            { model: "HA22S", weight: 680, years: "1998-2004", isKei: true },
            { model: "HA24S", weight: 700, years: "2004-2009", isKei: true },
            { model: "HA25S", weight: 680, years: "2009-2014", isKei: true },
            { model: "HA36S", weight: 650, years: "2014-2021", isKei: true },
            { model: "HA37S", weight: 680, years: "2021-", isKei: true }
        ],
        "アルトラパン": [
            { model: "HE21S", weight: 800, years: "2002-2008", isKei: true },
            { model: "HE22S", weight: 820, years: "2008-2015", isKei: true },
            { model: "HE33S", weight: 680, years: "2015-", isKei: true }
        ],
        "エブリイ": [
            { model: "DA62V", weight: 880, years: "1999-2005", isKei: true },
            { model: "DA64V", weight: 910, years: "2005-2015", isKei: true },
            { model: "DA17V", weight: 870, years: "2015-", isKei: true },
            { model: "DA17W", weight: 930, years: "2015-", isKei: true }
        ],
        "キャリイ": [
            { model: "DA63T", weight: 740, years: "2002-2013", isKei: true },
            { model: "DA16T", weight: 760, years: "2013-", isKei: true }
        ],
        // 追加車種（1980年代〜2000年代）
        "カルタス": [
            { model: "AA41S", weight: 780, years: "1983-1988" },
            { model: "AF34S", weight: 820, years: "1988-1995" },
            { model: "AB44S", weight: 850, years: "1988-1998" },
            { model: "GC21S", weight: 950, years: "1995-2002" },
            { model: "GD21S", weight: 980, years: "1995-2002" },
            { model: "GC21W", weight: 1000, years: "1996-2002" }
        ],
        "カルタスクレセント": [
            { model: "GC31S", weight: 980, years: "1995-2002" },
            { model: "GD31S", weight: 1010, years: "1995-2002" },
            { model: "GC31W", weight: 1020, years: "1996-2002" },
            { model: "GD31W", weight: 1050, years: "1996-2002" }
        ],
        "エスクード": [
            { model: "TA01W", weight: 1250, years: "1988-1997" },
            { model: "TD01W", weight: 1380, years: "1988-1997" },
            { model: "TA11W", weight: 1300, years: "1988-1997" },
            { model: "TA02W", weight: 1350, years: "1997-2005" },
            { model: "TD02W", weight: 1480, years: "1997-2005" },
            { model: "TD52W", weight: 1520, years: "1997-2005" },
            { model: "TD54W", weight: 1550, years: "2002-2005" },
            { model: "TA74W", weight: 1400, years: "2005-2015" },
            { model: "TD94W", weight: 1520, years: "2005-2015" },
            { model: "TDA4W", weight: 1580, years: "2008-2015" },
            { model: "YD21S", weight: 1210, years: "2015-2019" },
            { model: "YE21S", weight: 1280, years: "2017-2019" }
        ],
        "グランドエスクード": [
            { model: "TX92W", weight: 1890, years: "2000-2005" }
        ],
        "SX4": [
            { model: "YA11S", weight: 1150, years: "2006-2014" },
            { model: "YB11S", weight: 1200, years: "2006-2014" },
            { model: "YC11S", weight: 1230, years: "2006-2014" }
        ],
        "SX4 S-CROSS": [
            { model: "YA22S", weight: 1220, years: "2015-" },
            { model: "YB22S", weight: 1280, years: "2017-" }
        ],
        "Kei": [
            { model: "HN11S", weight: 690, years: "1998-2009", isKei: true },
            { model: "HN12S", weight: 730, years: "1998-2009", isKei: true },
            { model: "HN22S", weight: 760, years: "2000-2009", isKei: true }
        ],
        "セルボ": [
            { model: "CN31S", weight: 660, years: "1988-1998", isKei: true },
            { model: "CN32S", weight: 710, years: "1990-1998", isKei: true },
            { model: "HG21S", weight: 780, years: "2006-2009", isKei: true }
        ],
        "セルボモード": [
            { model: "CN21S", weight: 680, years: "1990-1998", isKei: true },
            { model: "CN22S", weight: 720, years: "1990-1998", isKei: true },
            { model: "CP31S", weight: 700, years: "1990-1998", isKei: true }
        ],
        "MRワゴン": [
            { model: "MF21S", weight: 800, years: "2001-2006", isKei: true },
            { model: "MF22S", weight: 830, years: "2006-2011", isKei: true },
            { model: "MF33S", weight: 810, years: "2011-2016", isKei: true }
        ],
        "パレット": [
            { model: "MK21S", weight: 920, years: "2008-2013", isKei: true }
        ],
        "ランディ": [
            { model: "SC25", weight: 1580, years: "2007-2010" },
            { model: "SNC25", weight: 1640, years: "2007-2010" },
            { model: "SC26", weight: 1630, years: "2010-2016" },
            { model: "SGC27", weight: 1680, years: "2016-2022" },
            { model: "SGNC27", weight: 1740, years: "2016-2022" },
            { model: "SC28", weight: 1720, years: "2022-" },
            { model: "SRGC28", weight: 1780, years: "2022-" }
        ]
    },
    "ダイハツ": {
        "タント": [
            { model: "L350S", weight: 880, years: "2003-2007", isKei: true },
            { model: "L360S", weight: 930, years: "2003-2007", isKei: true },
            { model: "L375S", weight: 900, years: "2007-2013", isKei: true },
            { model: "L385S", weight: 950, years: "2007-2013", isKei: true },
            { model: "LA600S", weight: 920, years: "2013-2019", isKei: true },
            { model: "LA610S", weight: 970, years: "2013-2019", isKei: true },
            { model: "LA650S", weight: 880, years: "2019-", isKei: true },
            { model: "LA660S", weight: 930, years: "2019-", isKei: true }
        ],
        "ムーヴ": [
            { model: "L600S", weight: 740, years: "1995-1998", isKei: true },
            { model: "L900S", weight: 790, years: "1998-2002", isKei: true },
            { model: "L150S", weight: 800, years: "2002-2006", isKei: true },
            { model: "L175S", weight: 810, years: "2006-2010", isKei: true },
            { model: "LA100S", weight: 810, years: "2010-2014", isKei: true },
            { model: "LA150S", weight: 820, years: "2014-", isKei: true },
            { model: "LA160S", weight: 870, years: "2014-", isKei: true }
        ],
        "ムーヴキャンバス": [
            { model: "LA800S", weight: 910, years: "2016-2022", isKei: true },
            { model: "LA810S", weight: 960, years: "2016-2022", isKei: true },
            { model: "LA850S", weight: 870, years: "2022-", isKei: true },
            { model: "LA860S", weight: 920, years: "2022-", isKei: true }
        ],
        "ミラ": [
            { model: "L500S", weight: 680, years: "1994-1998", isKei: true },
            { model: "L700S", weight: 700, years: "1998-2002", isKei: true },
            { model: "L250S", weight: 710, years: "2002-2006", isKei: true },
            { model: "L275S", weight: 730, years: "2006-2018", isKei: true },
            { model: "L285S", weight: 780, years: "2006-2018", isKei: true }
        ],
        "ミライース": [
            { model: "LA300S", weight: 730, years: "2011-2017", isKei: true },
            { model: "LA310S", weight: 780, years: "2011-2017", isKei: true },
            { model: "LA350S", weight: 650, years: "2017-", isKei: true },
            { model: "LA360S", weight: 700, years: "2017-", isKei: true }
        ],
        "ミラトコット": [
            { model: "LA550S", weight: 720, years: "2018-", isKei: true },
            { model: "LA560S", weight: 770, years: "2018-", isKei: true }
        ],
        "キャスト": [
            { model: "LA250S", weight: 840, years: "2015-", isKei: true },
            { model: "LA260S", weight: 890, years: "2015-", isKei: true }
        ],
        "タフト": [
            { model: "LA900S", weight: 830, years: "2020-", isKei: true },
            { model: "LA910S", weight: 880, years: "2020-", isKei: true }
        ],
        "コペン": [
            { model: "L880K", weight: 830, years: "2002-2012", isKei: true },
            { model: "LA400K", weight: 850, years: "2014-", isKei: true }
        ],
        "ロッキー": [
            { model: "A200S", weight: 970, years: "2019-" },
            { model: "A210S", weight: 1020, years: "2019-" },
            { model: "A200X", weight: 1040, years: "2021-" },
            { model: "A202S", weight: 1050, years: "2021-" }
        ],
        "トール": [
            { model: "M900S", weight: 1070, years: "2016-" },
            { model: "M910S", weight: 1100, years: "2016-" }
        ],
        "ブーン": [
            { model: "M300S", weight: 890, years: "2004-2010" },
            { model: "M600S", weight: 910, years: "2010-2016" },
            { model: "M700S", weight: 910, years: "2016-" }
        ],
        "ハイゼット": [
            { model: "S200V", weight: 810, years: "1999-2004", isKei: true },
            { model: "S320V", weight: 830, years: "2004-2021", isKei: true },
            { model: "S700V", weight: 900, years: "2021-", isKei: true },
            { model: "S710V", weight: 950, years: "2021-", isKei: true }
        ],
        "アトレー": [
            { model: "S220G", weight: 900, years: "1999-2005", isKei: true },
            { model: "S321G", weight: 930, years: "2005-2021", isKei: true },
            { model: "S700W", weight: 960, years: "2021-", isKei: true },
            { model: "S710W", weight: 1010, years: "2021-", isKei: true }
        ]
    },
    "三菱": {
        "デリカD:5": [
            { model: "CV5W", weight: 1880, years: "2007-2019" },
            { model: "CV4W", weight: 1850, years: "2012-2019" },
            { model: "CV1W", weight: 1930, years: "2019-" },
            { model: "CV2W", weight: 1970, years: "2019-" }
        ],
        "アウトランダー": [
            { model: "CW5W", weight: 1440, years: "2005-2012" },
            { model: "CW6W", weight: 1490, years: "2007-2012" },
            { model: "GF7W", weight: 1480, years: "2012-2021" },
            { model: "GF8W", weight: 1520, years: "2012-2021" },
            { model: "GN0W", weight: 1880, years: "2021-" }
        ],
        "アウトランダーPHEV": [
            { model: "GG2W", weight: 1860, years: "2013-2021" },
            { model: "GN0W", weight: 2010, years: "2021-" }
        ],
        "エクリプスクロス": [
            { model: "GK1W", weight: 1460, years: "2018-" },
            { model: "GK9W", weight: 1530, years: "2018-" },
            { model: "GL3W", weight: 1900, years: "2020-" }
        ],
        "RVR": [
            { model: "N23W", weight: 1440, years: "1991-1997" },
            { model: "N61W", weight: 1480, years: "1997-2002" },
            { model: "GA3W", weight: 1340, years: "2010-" },
            { model: "GA4W", weight: 1380, years: "2010-" }
        ],
        "パジェロ": [
            { model: "V43W", weight: 1960, years: "1991-1999" },
            { model: "V73W", weight: 2020, years: "1999-2006" },
            { model: "V83W", weight: 2130, years: "2006-2019" },
            { model: "V93W", weight: 2090, years: "2006-2019" },
            { model: "V97W", weight: 2220, years: "2006-2019" },
            { model: "V98W", weight: 2180, years: "2006-2019" }
        ],
        "パジェロミニ": [
            { model: "H56A", weight: 920, years: "1994-1998", isKei: true },
            { model: "H58A", weight: 960, years: "1998-2012", isKei: true }
        ],
        "ランサー": [
            { model: "CK2A", weight: 1010, years: "1995-2000" },
            { model: "CS2A", weight: 1080, years: "2000-2007" },
            { model: "CY3A", weight: 1180, years: "2007-2017" },
            { model: "CY4A", weight: 1240, years: "2007-2017" }
        ],
        "ランサーエボリューション": [
            { model: "CD9A", weight: 1170, years: "1992-1994" },
            { model: "CE9A", weight: 1220, years: "1994-1996" },
            { model: "CN9A", weight: 1260, years: "1996-1998" },
            { model: "CP9A", weight: 1320, years: "1998-2001" },
            { model: "CT9A", weight: 1400, years: "2001-2007" },
            { model: "CZ4A", weight: 1480, years: "2007-2016" }
        ],
        "eKワゴン": [
            { model: "H81W", weight: 830, years: "2001-2006", isKei: true },
            { model: "H82W", weight: 850, years: "2006-2013", isKei: true },
            { model: "B11W", weight: 830, years: "2013-2019", isKei: true },
            { model: "B33W", weight: 830, years: "2019-", isKei: true },
            { model: "B36W", weight: 880, years: "2019-", isKei: true }
        ],
        "eKクロス": [
            { model: "B34W", weight: 860, years: "2019-", isKei: true },
            { model: "B37W", weight: 910, years: "2019-", isKei: true }
        ],
        "eKスペース": [
            { model: "B11A", weight: 920, years: "2014-2020", isKei: true },
            { model: "B34A", weight: 940, years: "2020-", isKei: true },
            { model: "B35A", weight: 990, years: "2020-", isKei: true }
        ],
        "eKクロススペース": [
            { model: "B36A", weight: 960, years: "2020-", isKei: true },
            { model: "B37A", weight: 1010, years: "2020-", isKei: true }
        ],
        "eKクロスEV": [
            { model: "B5AW", weight: 1060, years: "2022-", isKei: true }
        ],
        "ミニキャブ": [
            { model: "U61V", weight: 830, years: "1999-2014", isKei: true },
            { model: "DS16T", weight: 860, years: "2014-", isKei: true }
        ],
        "i-MiEV": [
            { model: "HA3W", weight: 1080, years: "2009-2021", isKei: true }
        ],
        // 追加車種（1980年代〜2000年代）
        "ギャラン": [
            { model: "E32A", weight: 1150, years: "1987-1992" },
            { model: "E33A", weight: 1200, years: "1987-1992" },
            { model: "E35A", weight: 1230, years: "1987-1992" },
            { model: "E52A", weight: 1280, years: "1992-1996" },
            { model: "E53A", weight: 1320, years: "1992-1996" },
            { model: "E54A", weight: 1350, years: "1992-1996" },
            { model: "EA1A", weight: 1350, years: "1996-2005" },
            { model: "EA3A", weight: 1380, years: "1996-2005" },
            { model: "EA7A", weight: 1420, years: "1996-2005" },
            { model: "EC1A", weight: 1400, years: "1996-2005" },
            { model: "EC3A", weight: 1430, years: "1996-2005" },
            { model: "EC5A", weight: 1470, years: "1996-2005" }
        ],
        "シグマ": [
            { model: "F11A", weight: 1350, years: "1990-1996" },
            { model: "F12A", weight: 1380, years: "1990-1996" },
            { model: "F13A", weight: 1420, years: "1990-1996" },
            { model: "F17A", weight: 1460, years: "1990-1996" },
            { model: "F25A", weight: 1480, years: "1990-1996" }
        ],
        "ディアマンテ": [
            { model: "F31A", weight: 1450, years: "1990-1995" },
            { model: "F41A", weight: 1500, years: "1990-1995" },
            { model: "F36A", weight: 1530, years: "1995-2005" },
            { model: "F46A", weight: 1580, years: "1995-2005" },
            { model: "F47A", weight: 1620, years: "1997-2005" }
        ],
        "ディアマンテワゴン": [
            { model: "K45", weight: 1580, years: "1993-2000" },
            { model: "K47", weight: 1620, years: "1997-2000" }
        ],
        "レグナム": [
            { model: "EA1W", weight: 1400, years: "1996-2002" },
            { model: "EA3W", weight: 1430, years: "1996-2002" },
            { model: "EA7W", weight: 1470, years: "1996-2002" },
            { model: "EC1W", weight: 1450, years: "1996-2002" },
            { model: "EC3W", weight: 1480, years: "1996-2002" },
            { model: "EC5W", weight: 1520, years: "1996-2002" }
        ],
        "エテルナ": [
            { model: "E32A", weight: 1150, years: "1987-1992" },
            { model: "E33A", weight: 1200, years: "1987-1992" },
            { model: "E52A", weight: 1280, years: "1992-1996" },
            { model: "E53A", weight: 1320, years: "1992-1996" }
        ],
        "スタリオン": [
            { model: "A183A", weight: 1320, years: "1982-1990" },
            { model: "A187A", weight: 1380, years: "1985-1990" }
        ],
        "GTO": [
            { model: "Z15A", weight: 1510, years: "1990-2000" },
            { model: "Z16A", weight: 1620, years: "1990-2000" }
        ],
        "FTO": [
            { model: "DE2A", weight: 1180, years: "1994-2000" },
            { model: "DE3A", weight: 1230, years: "1994-2000" }
        ],
        "エクリプス": [
            { model: "D22A", weight: 1300, years: "1989-1995" },
            { model: "D32A", weight: 1370, years: "1995-1999" },
            { model: "D53A", weight: 1450, years: "1999-2005" }
        ],
        "ミラージュ": [
            { model: "C51A", weight: 850, years: "1983-1987" },
            { model: "C61A", weight: 900, years: "1987-1991" },
            { model: "CA4A", weight: 950, years: "1991-1995" },
            { model: "CJ4A", weight: 980, years: "1995-2002" },
            { model: "A03A", weight: 900, years: "2012-" },
            { model: "A05A", weight: 930, years: "2012-" }
        ],
        "ミラージュディンゴ": [
            { model: "CQ1A", weight: 1120, years: "1998-2002" },
            { model: "CQ2A", weight: 1170, years: "1998-2002" },
            { model: "CQ5A", weight: 1200, years: "1998-2002" }
        ],
        "ランサー": [
            { model: "CB1A", weight: 900, years: "1991-1995" },
            { model: "CB4A", weight: 950, years: "1991-1995" },
            { model: "CB8A", weight: 1000, years: "1991-1995" },
            { model: "CK1A", weight: 1000, years: "1995-2000" },
            { model: "CK4A", weight: 1050, years: "1995-2000" },
            { model: "CK6A", weight: 1080, years: "1995-2000" },
            { model: "CS2A", weight: 1150, years: "2000-2010" },
            { model: "CS5A", weight: 1200, years: "2000-2010" },
            { model: "CS6A", weight: 1230, years: "2000-2010" }
        ],
        "ランサーセディア": [
            { model: "CS2A", weight: 1150, years: "2000-2003" },
            { model: "CS5A", weight: 1200, years: "2000-2003" },
            { model: "CS6A", weight: 1230, years: "2000-2003" }
        ],
        "ランサーセディアワゴン": [
            { model: "CS5W", weight: 1250, years: "2000-2003" }
        ],
        "リベロ": [
            { model: "CB8W", weight: 1150, years: "1992-2000" },
            { model: "CD5W", weight: 1200, years: "1992-2000" },
            { model: "CD8W", weight: 1250, years: "1992-2000" }
        ],
        "シャリオ": [
            { model: "N33W", weight: 1450, years: "1991-1997" },
            { model: "N34W", weight: 1490, years: "1991-1997" },
            { model: "N43W", weight: 1520, years: "1991-1997" },
            { model: "N94W", weight: 1580, years: "1997-2003" }
        ],
        "シャリオグランディス": [
            { model: "N84W", weight: 1620, years: "1997-2003" },
            { model: "N86W", weight: 1680, years: "1997-2003" },
            { model: "N94W", weight: 1650, years: "1997-2003" },
            { model: "N96W", weight: 1720, years: "1997-2003" }
        ],
        "グランディス": [
            { model: "NA4W", weight: 1590, years: "2003-2009" }
        ],
        "デリカスペースギア": [
            { model: "PE8W", weight: 1880, years: "1994-2007" },
            { model: "PD8W", weight: 1920, years: "1994-2007" },
            { model: "PF8W", weight: 1960, years: "1994-2007" },
            { model: "PB5W", weight: 1850, years: "1997-2007" }
        ],
        "デリカバン": [
            { model: "SK82VM", weight: 1280, years: "1999-" },
            { model: "SKE6VM", weight: 1350, years: "2007-" }
        ],
        "パジェロ": [
            { model: "V43W", weight: 1950, years: "1991-1999" },
            { model: "V45W", weight: 2050, years: "1991-1999" },
            { model: "V46W", weight: 2100, years: "1991-1999" },
            { model: "V73W", weight: 1970, years: "1999-2006" },
            { model: "V75W", weight: 2020, years: "1999-2006" },
            { model: "V78W", weight: 2120, years: "1999-2006" },
            { model: "V83W", weight: 2050, years: "2006-2019" },
            { model: "V87W", weight: 2100, years: "2006-2019" },
            { model: "V93W", weight: 2120, years: "2006-2019" },
            { model: "V97W", weight: 2180, years: "2006-2019" },
            { model: "V98W", weight: 2220, years: "2006-2019" }
        ],
        "パジェロミニ": [
            { model: "H51A", weight: 860, years: "1994-1998", isKei: true },
            { model: "H53A", weight: 920, years: "1998-2013", isKei: true },
            { model: "H58A", weight: 960, years: "1998-2013", isKei: true }
        ],
        "パジェロイオ": [
            { model: "H61W", weight: 1150, years: "1998-2007" },
            { model: "H66W", weight: 1200, years: "1998-2007" },
            { model: "H71W", weight: 1220, years: "1998-2007" },
            { model: "H76W", weight: 1280, years: "1998-2007" }
        ],
        "チャレンジャー": [
            { model: "K94W", weight: 1740, years: "1996-2001" },
            { model: "K96W", weight: 1820, years: "1996-2001" },
            { model: "K97WG", weight: 1780, years: "1997-2001" },
            { model: "K99W", weight: 1860, years: "1997-2001" }
        ],
        "RVR": [
            { model: "N23W", weight: 1380, years: "1991-1997" },
            { model: "N28W", weight: 1450, years: "1991-1997" },
            { model: "N61W", weight: 1420, years: "1997-2002" },
            { model: "N64WG", weight: 1480, years: "1997-2002" },
            { model: "N71W", weight: 1440, years: "1997-2002" },
            { model: "N74WG", weight: 1510, years: "1997-2002" },
            { model: "GA3W", weight: 1360, years: "2010-2017" },
            { model: "GA4W", weight: 1420, years: "2010-2017" }
        ],
        "エアトレック": [
            { model: "CU2W", weight: 1380, years: "2001-2005" },
            { model: "CU4W", weight: 1420, years: "2001-2005" },
            { model: "CU5W", weight: 1450, years: "2001-2005" }
        ],
        "アスパイア": [
            { model: "EA1A", weight: 1350, years: "1998-2002" },
            { model: "EA7A", weight: 1420, years: "1998-2002" },
            { model: "EC1A", weight: 1400, years: "1998-2002" }
        ],
        "プラウディア": [
            { model: "S32A", weight: 1720, years: "1999-2001" },
            { model: "S33A", weight: 1780, years: "1999-2001" },
            { model: "BKNY51", weight: 1920, years: "2012-2016" }
        ],
        "ディグニティ": [
            { model: "S43A", weight: 1850, years: "1999-2001" },
            { model: "BHGY51", weight: 2020, years: "2012-2016" }
        ],
        "トッポ": [
            { model: "H82A", weight: 900, years: "2008-2013", isKei: true }
        ],
        "タウンボックス": [
            { model: "U61W", weight: 950, years: "1999-2011", isKei: true },
            { model: "U62W", weight: 990, years: "1999-2011", isKei: true },
            { model: "DS17W", weight: 950, years: "2014-", isKei: true }
        ],
        "ミニカ": [
            { model: "H31A", weight: 680, years: "1993-1998", isKei: true },
            { model: "H42A", weight: 720, years: "1998-2011", isKei: true },
            { model: "H47A", weight: 750, years: "1998-2011", isKei: true }
        ],
        "コルト": [
            { model: "Z21A", weight: 1000, years: "2002-2012" },
            { model: "Z22A", weight: 1030, years: "2002-2012" },
            { model: "Z23A", weight: 1050, years: "2002-2012" },
            { model: "Z27A", weight: 1100, years: "2004-2012" },
            { model: "Z27AG", weight: 1120, years: "2006-2012" }
        ],
        "コルトプラス": [
            { model: "Z23W", weight: 1080, years: "2004-2012" },
            { model: "Z24W", weight: 1120, years: "2004-2012" },
            { model: "Z27WG", weight: 1150, years: "2006-2012" }
        ],
        "デリカミニ": [
            { model: "B34A", weight: 970, years: "2023-", isKei: true },
            { model: "B35A", weight: 1020, years: "2023-", isKei: true }
        ],
        // 1970年代車種追加
        "ギャランGTO": [
            { model: "A53C", weight: 1050, years: "1970-1977" },
            { model: "A55C", weight: 1080, years: "1970-1977" }
        ],
        "ランサー（初代）": [
            { model: "A71", weight: 850, years: "1973-1979" },
            { model: "A72", weight: 880, years: "1973-1979" },
            { model: "A73", weight: 900, years: "1973-1979" }
        ],
        "コルト（初代）": [
            { model: "A72", weight: 800, years: "1970-1978" }
        ],
        "セレステ": [
            { model: "A77A", weight: 950, years: "1975-1981" },
            { model: "A78A", weight: 980, years: "1975-1981" }
        ]
    },
    // ===== 外国車メーカー =====
    "BMW": {
        "1シリーズ": [
            { model: "E87", weight: 1380, years: "2004-2011" },
            { model: "E82", weight: 1420, years: "2007-2013" },
            { model: "F20", weight: 1360, years: "2011-2019" },
            { model: "F40", weight: 1430, years: "2019-" }
        ],
        "2シリーズ": [
            { model: "F22", weight: 1450, years: "2014-2021" },
            { model: "F23", weight: 1530, years: "2015-2021" },
            { model: "F44", weight: 1470, years: "2020-" },
            { model: "F45", weight: 1540, years: "2014-2021" },
            { model: "F46", weight: 1600, years: "2015-2021" },
            { model: "G42", weight: 1490, years: "2022-" },
            { model: "U06", weight: 1530, years: "2022-" }
        ],
        "3シリーズ": [
            { model: "E21", weight: 1100, years: "1975-1983" },
            { model: "E30", weight: 1150, years: "1982-1994" },
            { model: "E36", weight: 1280, years: "1990-2000" },
            { model: "E46", weight: 1350, years: "1998-2006" },
            { model: "E90", weight: 1450, years: "2005-2011" },
            { model: "E91", weight: 1510, years: "2005-2012" },
            { model: "E92", weight: 1480, years: "2006-2013" },
            { model: "E93", weight: 1630, years: "2007-2013" },
            { model: "F30", weight: 1430, years: "2012-2019" },
            { model: "F31", weight: 1510, years: "2012-2019" },
            { model: "F34", weight: 1640, years: "2013-2020" },
            { model: "G20", weight: 1520, years: "2019-" },
            { model: "G21", weight: 1590, years: "2019-" }
        ],
        "4シリーズ": [
            { model: "F32", weight: 1500, years: "2013-2020" },
            { model: "F33", weight: 1630, years: "2014-2020" },
            { model: "F36", weight: 1580, years: "2014-2020" },
            { model: "G22", weight: 1560, years: "2020-" },
            { model: "G23", weight: 1710, years: "2021-" },
            { model: "G26", weight: 1640, years: "2021-" }
        ],
        "5シリーズ": [
            { model: "E28", weight: 1350, years: "1981-1988" },
            { model: "E34", weight: 1450, years: "1988-1996" },
            { model: "E39", weight: 1530, years: "1995-2003" },
            { model: "E60", weight: 1530, years: "2003-2010" },
            { model: "E61", weight: 1630, years: "2004-2010" },
            { model: "F10", weight: 1640, years: "2010-2017" },
            { model: "F11", weight: 1750, years: "2010-2017" },
            { model: "G30", weight: 1650, years: "2017-2023" },
            { model: "G31", weight: 1770, years: "2017-2023" },
            { model: "G60", weight: 1750, years: "2023-" }
        ],
        "6シリーズ": [
            { model: "E24", weight: 1450, years: "1976-1989" },
            { model: "E63", weight: 1690, years: "2003-2010" },
            { model: "E64", weight: 1770, years: "2004-2010" },
            { model: "F12", weight: 1800, years: "2011-2018" },
            { model: "F13", weight: 1710, years: "2011-2018" },
            { model: "F06", weight: 1780, years: "2012-2018" },
            { model: "G32", weight: 1850, years: "2017-" }
        ],
        "7シリーズ": [
            { model: "E23", weight: 1550, years: "1977-1986" },
            { model: "E32", weight: 1750, years: "1986-1994" },
            { model: "E38", weight: 1850, years: "1994-2001" },
            { model: "E65", weight: 1900, years: "2001-2008" },
            { model: "E66", weight: 1980, years: "2002-2008" },
            { model: "F01", weight: 1880, years: "2008-2015" },
            { model: "F02", weight: 1960, years: "2008-2015" },
            { model: "G11", weight: 1850, years: "2015-2022" },
            { model: "G12", weight: 1950, years: "2015-2022" },
            { model: "G70", weight: 2190, years: "2022-" }
        ],
        "8シリーズ": [
            { model: "E31", weight: 1790, years: "1989-1999" },
            { model: "G14", weight: 1920, years: "2019-" },
            { model: "G15", weight: 1850, years: "2018-" },
            { model: "G16", weight: 1900, years: "2019-" }
        ],
        "X1": [
            { model: "E84", weight: 1505, years: "2009-2015" },
            { model: "F48", weight: 1550, years: "2015-2022" },
            { model: "U11", weight: 1690, years: "2022-" }
        ],
        "X2": [
            { model: "F39", weight: 1535, years: "2018-2023" },
            { model: "U10", weight: 1715, years: "2024-" }
        ],
        "X3": [
            { model: "E83", weight: 1775, years: "2003-2010" },
            { model: "F25", weight: 1810, years: "2010-2017" },
            { model: "G01", weight: 1870, years: "2017-" }
        ],
        "X4": [
            { model: "F26", weight: 1870, years: "2014-2018" },
            { model: "G02", weight: 1920, years: "2018-" }
        ],
        "X5": [
            { model: "E53", weight: 2130, years: "1999-2006" },
            { model: "E70", weight: 2200, years: "2006-2013" },
            { model: "F15", weight: 2165, years: "2013-2018" },
            { model: "G05", weight: 2230, years: "2018-" }
        ],
        "X6": [
            { model: "E71", weight: 2195, years: "2008-2014" },
            { model: "F16", weight: 2195, years: "2014-2019" },
            { model: "G06", weight: 2310, years: "2019-" }
        ],
        "X7": [
            { model: "G07", weight: 2490, years: "2019-" }
        ],
        "Z3": [
            { model: "E36/7", weight: 1210, years: "1995-2002" },
            { model: "E36/8", weight: 1340, years: "1997-2002" }
        ],
        "Z4": [
            { model: "E85", weight: 1295, years: "2002-2008" },
            { model: "E86", weight: 1355, years: "2006-2008" },
            { model: "E89", weight: 1505, years: "2009-2016" },
            { model: "G29", weight: 1510, years: "2019-" }
        ],
        "M3": [
            { model: "E30M3", weight: 1165, years: "1986-1991" },
            { model: "E36M3", weight: 1460, years: "1992-1999" },
            { model: "E46M3", weight: 1570, years: "2000-2006" },
            { model: "E90M3", weight: 1655, years: "2007-2013" },
            { model: "F80", weight: 1560, years: "2014-2019" },
            { model: "G80", weight: 1730, years: "2021-" }
        ],
        "M4": [
            { model: "F82", weight: 1540, years: "2014-2020" },
            { model: "F83", weight: 1680, years: "2014-2020" },
            { model: "G82", weight: 1700, years: "2021-" },
            { model: "G83", weight: 1870, years: "2021-" }
        ],
        "M5": [
            { model: "E28M5", weight: 1430, years: "1984-1988" },
            { model: "E34M5", weight: 1720, years: "1988-1995" },
            { model: "E39M5", weight: 1795, years: "1998-2003" },
            { model: "E60M5", weight: 1830, years: "2005-2010" },
            { model: "F10M5", weight: 1870, years: "2011-2016" },
            { model: "F90", weight: 1930, years: "2017-" }
        ],
        "MINI": [
            { model: "R50", weight: 1090, years: "2001-2006" },
            { model: "R53", weight: 1215, years: "2001-2006" },
            { model: "R56", weight: 1130, years: "2006-2014" },
            { model: "R55", weight: 1205, years: "2007-2015" },
            { model: "R60", weight: 1400, years: "2010-2016" },
            { model: "F54", weight: 1395, years: "2015-" },
            { model: "F55", weight: 1200, years: "2014-" },
            { model: "F56", weight: 1160, years: "2014-" },
            { model: "F57", weight: 1320, years: "2016-" },
            { model: "F60", weight: 1540, years: "2017-" }
        ]
    },
    "メルセデス・ベンツ": {
        "Aクラス": [
            { model: "W168", weight: 1130, years: "1997-2004" },
            { model: "W169", weight: 1245, years: "2004-2012" },
            { model: "W176", weight: 1355, years: "2012-2018" },
            { model: "W177", weight: 1395, years: "2018-" },
            { model: "V177", weight: 1460, years: "2019-" }
        ],
        "Bクラス": [
            { model: "W245", weight: 1340, years: "2005-2011" },
            { model: "W246", weight: 1395, years: "2011-2019" },
            { model: "W247", weight: 1510, years: "2019-" }
        ],
        "Cクラス": [
            { model: "W201", weight: 1180, years: "1982-1993" },
            { model: "W202", weight: 1330, years: "1993-2000" },
            { model: "S202", weight: 1410, years: "1996-2001" },
            { model: "W203", weight: 1420, years: "2000-2007" },
            { model: "S203", weight: 1500, years: "2001-2007" },
            { model: "CL203", weight: 1490, years: "2001-2011" },
            { model: "W204", weight: 1500, years: "2007-2014" },
            { model: "S204", weight: 1580, years: "2008-2014" },
            { model: "C204", weight: 1560, years: "2011-2015" },
            { model: "W205", weight: 1490, years: "2014-2021" },
            { model: "S205", weight: 1570, years: "2014-2021" },
            { model: "C205", weight: 1550, years: "2016-2021" },
            { model: "A205", weight: 1700, years: "2016-2021" },
            { model: "W206", weight: 1575, years: "2021-" },
            { model: "S206", weight: 1655, years: "2021-" }
        ],
        "CLAクラス": [
            { model: "C117", weight: 1475, years: "2013-2019" },
            { model: "X117", weight: 1555, years: "2015-2019" },
            { model: "C118", weight: 1515, years: "2019-" },
            { model: "X118", weight: 1585, years: "2019-" }
        ],
        "Eクラス": [
            { model: "W123", weight: 1380, years: "1976-1985" },
            { model: "W124", weight: 1420, years: "1984-1995" },
            { model: "S124", weight: 1520, years: "1985-1996" },
            { model: "C124", weight: 1480, years: "1987-1996" },
            { model: "A124", weight: 1610, years: "1991-1997" },
            { model: "W210", weight: 1480, years: "1995-2002" },
            { model: "S210", weight: 1570, years: "1996-2003" },
            { model: "W211", weight: 1640, years: "2002-2009" },
            { model: "S211", weight: 1720, years: "2003-2009" },
            { model: "W212", weight: 1680, years: "2009-2016" },
            { model: "S212", weight: 1760, years: "2010-2016" },
            { model: "C207", weight: 1710, years: "2009-2017" },
            { model: "A207", weight: 1820, years: "2010-2017" },
            { model: "W213", weight: 1710, years: "2016-2023" },
            { model: "S213", weight: 1790, years: "2016-2023" },
            { model: "C238", weight: 1760, years: "2017-2023" },
            { model: "A238", weight: 1870, years: "2017-2023" },
            { model: "W214", weight: 1830, years: "2023-" }
        ],
        "Sクラス": [
            { model: "W116", weight: 1650, years: "1972-1980" },
            { model: "W126", weight: 1680, years: "1979-1991" },
            { model: "C126", weight: 1720, years: "1981-1991" },
            { model: "W140", weight: 2040, years: "1991-1998" },
            { model: "C140", weight: 2000, years: "1992-1999" },
            { model: "W220", weight: 1955, years: "1998-2005" },
            { model: "W221", weight: 1965, years: "2005-2013" },
            { model: "W222", weight: 1970, years: "2013-2020" },
            { model: "W223", weight: 2095, years: "2020-" }
        ],
        "CLSクラス": [
            { model: "C219", weight: 1750, years: "2004-2011" },
            { model: "C218", weight: 1795, years: "2011-2018" },
            { model: "X218", weight: 1875, years: "2012-2018" },
            { model: "C257", weight: 1835, years: "2018-" }
        ],
        "GLAクラス": [
            { model: "X156", weight: 1510, years: "2014-2020" },
            { model: "H247", weight: 1570, years: "2020-" }
        ],
        "GLBクラス": [
            { model: "X247", weight: 1770, years: "2020-" }
        ],
        "GLCクラス": [
            { model: "X253", weight: 1820, years: "2015-2022" },
            { model: "C253", weight: 1860, years: "2016-2020" },
            { model: "X254", weight: 1970, years: "2022-" }
        ],
        "GLEクラス": [
            { model: "W166", weight: 2170, years: "2015-2019" },
            { model: "C292", weight: 2235, years: "2015-2020" },
            { model: "W167", weight: 2260, years: "2019-" },
            { model: "C167", weight: 2335, years: "2020-" }
        ],
        "GLSクラス": [
            { model: "X166", weight: 2545, years: "2015-2019" },
            { model: "X167", weight: 2600, years: "2020-" }
        ],
        "Gクラス": [
            { model: "W460", weight: 1850, years: "1979-1991" },
            { model: "W461", weight: 2160, years: "1992-2001" },
            { model: "W463", weight: 2480, years: "1990-2018" },
            { model: "W463A", weight: 2560, years: "2018-" }
        ],
        "SLクラス": [
            { model: "R107", weight: 1580, years: "1971-1989" },
            { model: "R129", weight: 1780, years: "1989-2001" },
            { model: "R230", weight: 1790, years: "2001-2011" },
            { model: "R231", weight: 1710, years: "2012-2020" },
            { model: "R232", weight: 1870, years: "2022-" }
        ],
        "SLCクラス": [
            { model: "R170", weight: 1330, years: "1996-2004" },
            { model: "R171", weight: 1390, years: "2004-2011" },
            { model: "R172", weight: 1435, years: "2011-2020" }
        ],
        "AMG GT": [
            { model: "C190", weight: 1615, years: "2014-2021" },
            { model: "X290", weight: 2045, years: "2018-" },
            { model: "C192", weight: 1790, years: "2023-" }
        ]
    },
    "アウディ": {
        "A1": [
            { model: "8X", weight: 1155, years: "2010-2019" },
            { model: "GB", weight: 1240, years: "2019-" }
        ],
        "A3": [
            { model: "8L", weight: 1245, years: "1996-2003" },
            { model: "8P", weight: 1340, years: "2003-2013" },
            { model: "8V", weight: 1280, years: "2013-2020" },
            { model: "8Y", weight: 1350, years: "2020-" }
        ],
        "A4": [
            { model: "B5", weight: 1375, years: "1994-2001" },
            { model: "B6", weight: 1430, years: "2000-2006" },
            { model: "B7", weight: 1490, years: "2004-2009" },
            { model: "B8", weight: 1530, years: "2008-2016" },
            { model: "B9", weight: 1540, years: "2015-" }
        ],
        "A5": [
            { model: "8T", weight: 1625, years: "2007-2017" },
            { model: "F5", weight: 1590, years: "2016-" }
        ],
        "A6": [
            { model: "C4", weight: 1530, years: "1994-1997" },
            { model: "C5", weight: 1570, years: "1997-2004" },
            { model: "C6", weight: 1675, years: "2004-2011" },
            { model: "C7", weight: 1710, years: "2011-2018" },
            { model: "C8", weight: 1770, years: "2018-" }
        ],
        "A7": [
            { model: "4G", weight: 1820, years: "2010-2018" },
            { model: "4K", weight: 1860, years: "2018-" }
        ],
        "A8": [
            { model: "D2", weight: 1780, years: "1994-2002" },
            { model: "D3", weight: 1870, years: "2002-2010" },
            { model: "D4", weight: 1920, years: "2010-2017" },
            { model: "D5", weight: 1995, years: "2017-" }
        ],
        "Q2": [
            { model: "GA", weight: 1345, years: "2016-" }
        ],
        "Q3": [
            { model: "8U", weight: 1560, years: "2011-2018" },
            { model: "F3", weight: 1605, years: "2018-" }
        ],
        "Q5": [
            { model: "8R", weight: 1900, years: "2008-2017" },
            { model: "FY", weight: 1920, years: "2017-" }
        ],
        "Q7": [
            { model: "4L", weight: 2380, years: "2006-2015" },
            { model: "4M", weight: 2135, years: "2015-" }
        ],
        "Q8": [
            { model: "4MN", weight: 2185, years: "2018-" }
        ],
        "TT": [
            { model: "8N", weight: 1305, years: "1998-2006" },
            { model: "8J", weight: 1335, years: "2006-2014" },
            { model: "FV", weight: 1295, years: "2014-" }
        ],
        "R8": [
            { model: "42", weight: 1615, years: "2006-2015" },
            { model: "4S", weight: 1670, years: "2015-" }
        ],
        "e-tron": [
            { model: "GE", weight: 2565, years: "2019-" }
        ],
        "RS3": [
            { model: "8V", weight: 1520, years: "2015-2020" },
            { model: "8Y", weight: 1570, years: "2021-" }
        ],
        "RS4": [
            { model: "B5", weight: 1620, years: "2000-2001" },
            { model: "B7", weight: 1710, years: "2006-2008" },
            { model: "B8", weight: 1795, years: "2012-2015" },
            { model: "B9", weight: 1790, years: "2018-" }
        ],
        "RS5": [
            { model: "8T", weight: 1840, years: "2010-2017" },
            { model: "F5", weight: 1790, years: "2017-" }
        ],
        "RS6": [
            { model: "C5", weight: 1865, years: "2002-2004" },
            { model: "C6", weight: 1985, years: "2008-2010" },
            { model: "C7", weight: 1935, years: "2013-2018" },
            { model: "C8", weight: 2075, years: "2019-" }
        ],
        "RS7": [
            { model: "4G", weight: 1920, years: "2013-2018" },
            { model: "C8", weight: 2065, years: "2019-" }
        ]
    },
    "フォルクスワーゲン": {
        "ゴルフ": [
            { model: "1型", weight: 810, years: "1974-1983" },
            { model: "2型", weight: 960, years: "1983-1992" },
            { model: "3型", weight: 1100, years: "1991-1997" },
            { model: "4型", weight: 1240, years: "1997-2003" },
            { model: "5型", weight: 1335, years: "2003-2009" },
            { model: "6型", weight: 1320, years: "2008-2013" },
            { model: "7型", weight: 1310, years: "2012-2021" },
            { model: "8型", weight: 1360, years: "2019-" }
        ],
        "ゴルフGTI": [
            { model: "1型GTI", weight: 870, years: "1976-1983" },
            { model: "2型GTI", weight: 1040, years: "1984-1992" },
            { model: "3型GTI", weight: 1180, years: "1992-1997" },
            { model: "4型GTI", weight: 1340, years: "1998-2003" },
            { model: "5型GTI", weight: 1400, years: "2004-2009" },
            { model: "6型GTI", weight: 1395, years: "2009-2013" },
            { model: "7型GTI", weight: 1370, years: "2013-2020" },
            { model: "8型GTI", weight: 1430, years: "2020-" }
        ],
        "ゴルフR": [
            { model: "4型R32", weight: 1475, years: "2002-2004" },
            { model: "5型R32", weight: 1550, years: "2005-2008" },
            { model: "6型R", weight: 1480, years: "2010-2013" },
            { model: "7型R", weight: 1480, years: "2014-2020" },
            { model: "8型R", weight: 1530, years: "2021-" }
        ],
        "ポロ": [
            { model: "6N", weight: 1010, years: "1994-2001" },
            { model: "9N", weight: 1080, years: "2001-2009" },
            { model: "6R", weight: 1120, years: "2009-2017" },
            { model: "AW", weight: 1180, years: "2017-" }
        ],
        "up!": [
            { model: "AA", weight: 930, years: "2012-2020" }
        ],
        "パサート": [
            { model: "B3", weight: 1200, years: "1988-1993" },
            { model: "B4", weight: 1320, years: "1993-1997" },
            { model: "B5", weight: 1420, years: "1996-2005" },
            { model: "B6", weight: 1505, years: "2005-2010" },
            { model: "B7", weight: 1530, years: "2010-2015" },
            { model: "B8", weight: 1500, years: "2015-" }
        ],
        "アルテオン": [
            { model: "3H", weight: 1580, years: "2017-" }
        ],
        "ティグアン": [
            { model: "5N", weight: 1655, years: "2007-2016" },
            { model: "AD", weight: 1620, years: "2016-" }
        ],
        "T-Cross": [
            { model: "C1", weight: 1310, years: "2019-" }
        ],
        "T-Roc": [
            { model: "A1", weight: 1445, years: "2017-" }
        ],
        "トゥアレグ": [
            { model: "7L", weight: 2360, years: "2002-2010" },
            { model: "7P", weight: 2220, years: "2010-2018" },
            { model: "CR", weight: 2145, years: "2018-" }
        ],
        "シャラン": [
            { model: "7M", weight: 1785, years: "1995-2010" },
            { model: "7N", weight: 1855, years: "2010-2022" }
        ],
        "トゥーラン": [
            { model: "1T", weight: 1505, years: "2003-2015" },
            { model: "5T", weight: 1545, years: "2015-" }
        ],
        "ビートル": [
            { model: "9C", weight: 1255, years: "1998-2010" },
            { model: "16", weight: 1290, years: "2011-2019" }
        ],
        "シロッコ": [
            { model: "13", weight: 1330, years: "2008-2017" }
        ]
    },
    "ボルボ": {
        "S60": [
            { model: "初代", weight: 1445, years: "2000-2009" },
            { model: "2代目", weight: 1580, years: "2010-2018" },
            { model: "3代目", weight: 1700, years: "2019-" }
        ],
        "S90": [
            { model: "初代", weight: 1670, years: "1997-1998" },
            { model: "2代目", weight: 1900, years: "2016-" }
        ],
        "V40": [
            { model: "初代", weight: 1310, years: "1995-2004" },
            { model: "2代目", weight: 1470, years: "2012-2019" }
        ],
        "V60": [
            { model: "初代", weight: 1640, years: "2010-2018" },
            { model: "2代目", weight: 1810, years: "2018-" }
        ],
        "V70": [
            { model: "初代", weight: 1475, years: "1996-2000" },
            { model: "2代目", weight: 1620, years: "2000-2007" },
            { model: "3代目", weight: 1760, years: "2007-2016" }
        ],
        "V90": [
            { model: "初代", weight: 1530, years: "1996-1998" },
            { model: "2代目", weight: 1920, years: "2016-" }
        ],
        "XC40": [
            { model: "初代", weight: 1645, years: "2018-" }
        ],
        "XC60": [
            { model: "初代", weight: 1850, years: "2008-2017" },
            { model: "2代目", weight: 1980, years: "2017-" }
        ],
        "XC70": [
            { model: "初代", weight: 1580, years: "2000-2007" },
            { model: "2代目", weight: 1830, years: "2007-2016" }
        ],
        "XC90": [
            { model: "初代", weight: 2110, years: "2002-2015" },
            { model: "2代目", weight: 2140, years: "2015-" }
        ],
        "C30": [
            { model: "初代", weight: 1340, years: "2006-2013" }
        ],
        "C70": [
            { model: "初代", weight: 1480, years: "1996-2005" },
            { model: "2代目", weight: 1755, years: "2006-2013" }
        ]
    },
    "ポルシェ": {
        "911": [
            { model: "930", weight: 1160, years: "1974-1989" },
            { model: "964", weight: 1350, years: "1989-1994" },
            { model: "993", weight: 1370, years: "1993-1998" },
            { model: "996", weight: 1370, years: "1997-2006" },
            { model: "997", weight: 1415, years: "2004-2012" },
            { model: "991", weight: 1430, years: "2011-2019" },
            { model: "992", weight: 1530, years: "2019-" }
        ],
        "718ケイマン": [
            { model: "982", weight: 1365, years: "2016-" }
        ],
        "718ボクスター": [
            { model: "982", weight: 1365, years: "2016-" }
        ],
        "ケイマン": [
            { model: "987", weight: 1340, years: "2005-2012" },
            { model: "981", weight: 1340, years: "2012-2016" }
        ],
        "ボクスター": [
            { model: "986", weight: 1295, years: "1996-2004" },
            { model: "987", weight: 1335, years: "2004-2012" },
            { model: "981", weight: 1340, years: "2012-2016" }
        ],
        "カイエン": [
            { model: "9PA", weight: 2170, years: "2002-2010" },
            { model: "92A", weight: 2040, years: "2010-2017" },
            { model: "9YA", weight: 2030, years: "2017-" }
        ],
        "マカン": [
            { model: "95B", weight: 1865, years: "2014-" }
        ],
        "パナメーラ": [
            { model: "970", weight: 1850, years: "2009-2016" },
            { model: "971", weight: 1910, years: "2016-" }
        ],
        "タイカン": [
            { model: "Y1A", weight: 2305, years: "2020-" }
        ]
    },
    "ジープ": {
        "ラングラー": [
            { model: "YJ", weight: 1450, years: "1987-1995" },
            { model: "TJ", weight: 1560, years: "1996-2006" },
            { model: "JK", weight: 1870, years: "2007-2018" },
            { model: "JL", weight: 1960, years: "2018-" }
        ],
        "チェロキー": [
            { model: "XJ", weight: 1520, years: "1984-2001" },
            { model: "KJ", weight: 1720, years: "2001-2008" },
            { model: "KK", weight: 1760, years: "2008-2013" },
            { model: "KL", weight: 1810, years: "2014-" }
        ],
        "グランドチェロキー": [
            { model: "ZJ", weight: 1900, years: "1993-1998" },
            { model: "WJ", weight: 1970, years: "1999-2004" },
            { model: "WK", weight: 2195, years: "2005-2010" },
            { model: "WK2", weight: 2270, years: "2011-2021" },
            { model: "WL", weight: 2330, years: "2022-" }
        ],
        "コンパス": [
            { model: "MK49", weight: 1505, years: "2007-2016" },
            { model: "MP", weight: 1530, years: "2017-" }
        ],
        "レネゲード": [
            { model: "BU", weight: 1410, years: "2015-" }
        ],
        "コマンダー": [
            { model: "XK", weight: 2290, years: "2006-2010" }
        ],
        "パトリオット": [
            { model: "MK74", weight: 1505, years: "2007-2016" }
        ]
    },
    "フィアット": {
        "500": [
            { model: "312", weight: 940, years: "2007-" }
        ],
        "500X": [
            { model: "334", weight: 1420, years: "2015-" }
        ],
        "パンダ": [
            { model: "141", weight: 730, years: "1980-2003" },
            { model: "169", weight: 945, years: "2003-2012" },
            { model: "312", weight: 1015, years: "2012-" }
        ],
        "プント": [
            { model: "176", weight: 975, years: "1993-1999" },
            { model: "188", weight: 1040, years: "1999-2010" }
        ]
    },
    "アルファロメオ": {
        "ジュリア": [
            { model: "952", weight: 1520, years: "2017-" }
        ],
        "ジュリエッタ": [
            { model: "940", weight: 1320, years: "2010-2021" }
        ],
        "ステルヴィオ": [
            { model: "949", weight: 1830, years: "2017-" }
        ],
        "4C": [
            { model: "960", weight: 1050, years: "2013-2020" }
        ],
        "GTV": [
            { model: "916", weight: 1370, years: "1995-2006" }
        ],
        "スパイダー": [
            { model: "916", weight: 1350, years: "1995-2006" }
        ],
        "147": [
            { model: "937", weight: 1205, years: "2001-2010" }
        ],
        "156": [
            { model: "932", weight: 1350, years: "1997-2007" }
        ],
        "159": [
            { model: "939", weight: 1530, years: "2005-2012" }
        ],
        "MiTo": [
            { model: "955", weight: 1145, years: "2008-2018" }
        ]
    },
    "プジョー": {
        "208": [
            { model: "A9", weight: 1045, years: "2012-2019" },
            { model: "P21", weight: 1170, years: "2019-" }
        ],
        "308": [
            { model: "T7", weight: 1290, years: "2007-2013" },
            { model: "T9", weight: 1205, years: "2013-2021" },
            { model: "P5", weight: 1295, years: "2021-" }
        ],
        "508": [
            { model: "W1", weight: 1480, years: "2010-2018" },
            { model: "W2", weight: 1555, years: "2018-" }
        ],
        "2008": [
            { model: "A94", weight: 1195, years: "2013-2019" },
            { model: "P24", weight: 1310, years: "2020-" }
        ],
        "3008": [
            { model: "T84", weight: 1410, years: "2008-2016" },
            { model: "P84", weight: 1520, years: "2016-" }
        ],
        "5008": [
            { model: "T87", weight: 1550, years: "2009-2017" },
            { model: "P87", weight: 1610, years: "2017-" }
        ],
        "RCZ": [
            { model: "T75", weight: 1350, years: "2010-2015" }
        ]
    },
    "ルノー": {
        "メガーヌ": [
            { model: "初代", weight: 1165, years: "1995-2003" },
            { model: "2代目", weight: 1320, years: "2002-2009" },
            { model: "3代目", weight: 1335, years: "2008-2016" },
            { model: "4代目", weight: 1380, years: "2016-" }
        ],
        "ルーテシア": [
            { model: "初代", weight: 860, years: "1990-1998" },
            { model: "2代目", weight: 1040, years: "1998-2005" },
            { model: "3代目", weight: 1070, years: "2005-2013" },
            { model: "4代目", weight: 1090, years: "2013-2019" },
            { model: "5代目", weight: 1195, years: "2019-" }
        ],
        "カングー": [
            { model: "初代", weight: 1230, years: "1997-2008" },
            { model: "2代目", weight: 1415, years: "2008-2021" },
            { model: "3代目", weight: 1570, years: "2021-" }
        ],
        "キャプチャー": [
            { model: "初代", weight: 1260, years: "2013-2019" },
            { model: "2代目", weight: 1330, years: "2019-" }
        ],
        "トゥインゴ": [
            { model: "初代", weight: 850, years: "1992-2007" },
            { model: "2代目", weight: 1020, years: "2007-2014" },
            { model: "3代目", weight: 1020, years: "2014-" }
        ],
        "アルカナ": [
            { model: "初代", weight: 1500, years: "2021-" }
        ]
    },
    "ヒュンダイ": {
        "ソナタ": [
            { model: "Y2", weight: 1150, years: "1988-1993" },
            { model: "Y3", weight: 1250, years: "1993-1998" },
            { model: "EF", weight: 1350, years: "1998-2004" },
            { model: "NF", weight: 1450, years: "2004-2009" },
            { model: "YF", weight: 1490, years: "2009-2014" },
            { model: "LF", weight: 1465, years: "2014-2019" },
            { model: "DN8", weight: 1510, years: "2019-" }
        ],
        "ツーソン": [
            { model: "JM", weight: 1610, years: "2004-2009" },
            { model: "LM", weight: 1705, years: "2009-2015" },
            { model: "TL", weight: 1595, years: "2015-2020" },
            { model: "NX4", weight: 1660, years: "2021-" }
        ],
        "コナ": [
            { model: "OS", weight: 1335, years: "2017-" }
        ],
        "アイオニック5": [
            { model: "NE", weight: 1950, years: "2021-" }
        ],
        "グレンジャー": [
            { model: "XG", weight: 1540, years: "1998-2005" },
            { model: "TG", weight: 1625, years: "2005-2011" },
            { model: "HG", weight: 1660, years: "2011-2016" },
            { model: "IG", weight: 1695, years: "2016-" }
        ]
    },
    "キア": {
        "スポルテージ": [
            { model: "JA", weight: 1480, years: "1993-2002" },
            { model: "KM", weight: 1610, years: "2004-2010" },
            { model: "SL", weight: 1590, years: "2010-2015" },
            { model: "QL", weight: 1580, years: "2015-2021" },
            { model: "NQ5", weight: 1710, years: "2021-" }
        ],
        "ソレント": [
            { model: "BL", weight: 1895, years: "2002-2009" },
            { model: "XM", weight: 1955, years: "2009-2014" },
            { model: "UM", weight: 1895, years: "2014-2020" },
            { model: "MQ4", weight: 1980, years: "2020-" }
        ],
        "セルトス": [
            { model: "SP2", weight: 1340, years: "2019-" }
        ],
        "ニーロ": [
            { model: "DE", weight: 1495, years: "2016-" }
        ],
        "EV6": [
            { model: "CV", weight: 1930, years: "2021-" }
        ]
    }
};

function getCarMakers() { return Object.keys(CAR_DATABASE); }
function getCarNames(maker) { return CAR_DATABASE[maker] ? Object.keys(CAR_DATABASE[maker]) : []; }
function getCarModels(maker, carName) { return CAR_DATABASE[maker]?.[carName] || []; }
function getCarInfoByModel(maker, carName, modelCode) {
    return getCarModels(maker, carName).find(m => m.model === modelCode);
}
