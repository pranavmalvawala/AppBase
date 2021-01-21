import React, { useCallback } from 'react';
import { ReportFilterFieldInterface, ReportFilterInterface, ReportInterface } from '../../interfaces/ReportInterfaces';
import { InputBox } from '../InputBox';
import { DateHelper } from "../../helpers";
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';



interface Props { filter: ReportFilterInterface, updateFunction: (filter: ReportFilterInterface) => void }

export const ReportFilter = (props: Props) => {
    const [filter, setFilter] = React.useState<ReportFilterInterface>(null);
    const handleUpdate = useCallback(() => { props.updateFunction(filter); }, [props])
    const handleKeyDown = (e: React.KeyboardEvent<any>) => { if (e.key === 'Enter') { e.preventDefault(); handleUpdate(); } }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValue(e.currentTarget.name, e.currentTarget.value);
    }

    const setValue = (key: string, value: any) => {
        const _filter = { ...filter };
        _filter.fields.forEach(f => { if (f.keyName === key) f.value = value });
        setFilter(_filter);
    }

    const getControl = (field: ReportFilterFieldInterface) => {
        // 
        var result = null;
        switch (field.dataType) {
            case "date":
                result = <FormControl type="date" data-cy="select-date" name={field.keyName} value={DateHelper.formatHtml5Date(field.value)} onChange={handleChange} onKeyDown={handleKeyDown} />;
                break;
        }
        return result;
    }

    const getFields = () => {
        const result: JSX.Element[] = [];
        props.filter.fields.forEach(f => {
            result.push(<FormGroup key={f.keyName}>
                <FormLabel>{f.displayName}</FormLabel>
                {getControl(f)}
            </FormGroup>);
        });
        return result;
    }

    React.useEffect(() => { setFilter(props.filter) }, [props.filter]);

    if (props.filter === null) return null;
    else return (
        <InputBox headerIcon="far fa-chart-bar" data-cy="filter-box" headerText="Filter Report" saveFunction={handleUpdate} saveText="Update" id={"filterBox-" + props.filter.keyName}  >
            {getFields()}
        </InputBox>
    );

}
