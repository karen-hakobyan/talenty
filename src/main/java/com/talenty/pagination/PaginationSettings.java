package com.talenty.pagination;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PaginationSettings {
    private int page;
    private int size;
}
