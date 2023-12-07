'use client';

import Button from '~/core/ui/Button';
import Checkbox from '~/core/ui/Checkbox';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/core/ui/Table';

const InstallersTable = () => {
  return (
    <Table>
      <TableHeader className={'border-b-2 dark:border-white'}>
        <TableRow className={'dark:bg-[rgba(73,189,254,0.10)]'}>
          <TableHead>
            <Checkbox
              checked={false}
              handleChange={() => { }}
            />
          </TableHead>
          <TableHead className={'w-[500px]'}>Nmae</TableHead>
          <TableHead className={'w-[500px]'}>Materials</TableHead>
          <TableHead className={'w-[500px]'}>Daily Capacity</TableHead>
          <TableHead className={'w-[500px]'}>Distance Preference</TableHead>
          <TableHead className={'w-[500px]'}>Hiring Manager</TableHead>
          <TableHead className={'w-[500px]'}>Property Preference</TableHead>
          <TableHead className={'w-[500px]'}></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Checkbox
              checked={false}
              handleChange={() => { }}
            />
          </TableCell>
          <TableCell>John Smith</TableCell>
          <TableCell>Vinyl</TableCell>
          <TableCell>per material (sq ft/yd)</TableCell>
          <TableCell>City, ZIP, or Area</TableCell>
          <TableCell>Edgar</TableCell>
          <TableCell>Property Name</TableCell>
          <TableCell>
            <div className={'flex'}>
              <Button
                type={'button'}
                variant={'ghost'}
                size={'small'}
                onClick={() => { }}
              >
                <span className={'text-xs font-normal'}>Edit</span>
              </Button>
              <Button
                type={'button'}
                variant={'ghost'}
                size={'small'}
                onClick={() => { }}
              >
                <span className={'text-xs font-normal'}>View</span>
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default InstallersTable;