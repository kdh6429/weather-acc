export interface SummaryInterface {
    update: Number
    id: string
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
interface uItems extends Items{}
interface vItems extends Items{
    pop_0: ItemWithoutHistory
    pop_10: ItemWithoutHistory
    pop_20: ItemWithoutHistory
    pop_30: ItemWithoutHistory
    pop_40: ItemWithoutHistory
    pop_50: ItemWithoutHistory
    pop_60: ItemWithoutHistory
    pop_70: ItemWithoutHistory
    pop_80: ItemWithoutHistory
    pop_90: ItemWithoutHistory
}
interface dItems extends vItems{
}

interface Items {
    pty: ItemWithoutHistory
    reh: ItemWithHistory
    vec: ItemWithHistory
    t1h: ItemWithHistory
    rn1: ItemWithHistory
    wsd: ItemWithHistory
    stmp_w: ItemWithHistory
    stmp_s: ItemWithHistory
}
interface ItemWithoutHistory {
    avg: Number;
    info: Map<string, any>;
}
interface ItemWithHistory {
    avg: Number;
    info: Map<string, Number>;
    history: Array<ItemHistory>
}
interface ItemHistory {
    avg: Number
    t: Number
}
