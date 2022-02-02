export interface RegionInterface {
    update: Number
    id: string
    local: string
    u1: uItems,
    u2: uItems,
    u3: uItems,
    u4: uItems,
    u5: uItems,

    v6: vItems
    v9: vItems
    v12: vItems
    v15: vItems
    v18: vItems
    v21: vItems
    v24: vItems
    v36: vItems
    v48: vItems

    d3: dItems
    d4: dItems
    d5: dItems
    d6: dItems
    d7: dItems
    d8: dItems
    d9: dItems
    d10: dItems
}

interface uItem1 {
    raw: Array<Pick<RawWithSingleActual, "t" | "f" | "a" | "f">>
    history: Array<Pick<Histroy, "t"|"r">>
    rate: Number
}
interface uItem2 {
    raw: Array<Pick<RawWithSingleActual, "t" | "f" | "a" | "d">>
    history: Array<Pick<Histroy, "t"|"a">>
    rate: Number
}
interface uItems {
    pty: uItem1
    reh: uItem2
    vec: uItem2
    t1h: uItem2
    rn1: uItem2
    wsd: uItem2
    stmp_w: uItem2
    stmp_s:uItem2
}

interface vItem1 {
    raw: Array<Pick<RawWithArrayActual, "t" | "f" | "a" | "f">>
    history: Array<Pick<Histroy, "t"|"r">>
    rate: Number
}
interface vItem2 {
    raw: Array<Pick<RawWithArrayActual, "t" | "f">>
    history: Array<Pick<Histroy, "t"|"r">>
    rate: Number
}
interface vItem3 {
    raw: Array<Pick<RawWithSingleActual, "t" | "f" | "a" | "d">>
    history: Array<Pick<Histroy, "t"|"a">>
    rate: Number
}

interface vItems {
    pty: vItem1
    pop_0: vItem2
    pop_10: vItem2
    pop_20: vItem2
    pop_30: vItem2
    pop_40: vItem2
    pop_50: vItem2
    pop_60: vItem2
    pop_70: vItem2
    pop_80: vItem2
    pop_90: vItem2
    reh: vItem3
    vec: vItem3
    t1h: vItem3
    rn1: vItem3
    wsd: vItem3
    stmp_w: vItem3
    stmp_s: vItem3
}


interface dItem1 {
    raw: Array<Pick<RawWithArrayActual, "t" | "f" | "a" | "f">>
    history: Array<Pick<Histroy, "t"|"r">>
    rate: Number
}
interface dItem2 {
    raw: Array<Pick<RawWithArrayActual, "t" | "f">>
    history: Array<Pick<Histroy, "t"|"r">>
    rate: Number
}
interface dItems {
    pty: dItem1
    pop_0: dItem2
    pop_10: dItem2
    pop_20: dItem2
    pop_30: dItem2
    pop_40: dItem2
    pop_50: dItem2
    pop_60: dItem2
    pop_70: dItem2
    pop_80: dItem2
    pop_90: dItem2
}

interface Raw {
    t: Number
    e: string
    f: boolean
    d: Number
}
interface RawWithSingleActual extends Raw {
    a: string
}
interface RawWithArrayActual extends Raw {
    a: Array<string>
}

interface Histroy {
    t: Number
    r: Number
    a: Number
}
