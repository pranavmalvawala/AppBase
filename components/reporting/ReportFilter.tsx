import React, { useCallback } from 'react';
import { ReportFilterFieldInterface, ReportFilterInterface, ReportInterface } from '../../interfaces/ReportInterfaces';
import { InputBox } from '../InputBox';
import { DateHelper } from "../../helpers";
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';

//updateFunction: (values: ReportValueInterface[]) => void

interface Props { filter: ReportFilterInterface }

export const ReportFilter = (props: Props) => {


    const handleUpdate = useCallback(() => {
        //props.updateFunction(report?.values); 
    }, [props])
    /*
    const handleKeyDown = (e: React.KeyboardEvent<any>) => { if (e.key === 'Enter') { e.preventDefault(); handleUpdate(); } }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValue(e.currentTarget.name, e.currentTarget.value);
    }

    const setValue = (key: string, value: any) => {
        const _report = { ...report };
        _report.values.forEach(v => { if (v.key === key) v.value = value });
        setReport(_report);
    }
*/

    const getControl = (field: ReportFilterFieldInterface) => {
        // onChange={handleChange} onKeyDown={handleKeyDown} 
        var result = null;
        switch (field.dataType) {
            case "date":
                result = <FormControl type="date" data-cy="select-date" name={field.keyName} value={DateHelper.formatHtml5Date(field.value)} />;
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


    return (
        <InputBox headerIcon="far fa-chart-bar" data-cy="filter-box" headerText="Filter Report" saveFunction={handleUpdate} saveText="Update" id={"filterBox-" + props.filter.keyName}  >
            {getFields()}
        </InputBox>
    );

}
