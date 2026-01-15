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
        ]
    }
};

function getCarMakers() { return Object.keys(CAR_DATABASE); }
function getCarNames(maker) { return CAR_DATABASE[maker] ? Object.keys(CAR_DATABASE[maker]) : []; }
function getCarModels(maker, carName) { return CAR_DATABASE[maker]?.[carName] || []; }
function getCarInfoByModel(maker, carName, modelCode) {
    return getCarModels(maker, carName).find(m => m.model === modelCode);
}
