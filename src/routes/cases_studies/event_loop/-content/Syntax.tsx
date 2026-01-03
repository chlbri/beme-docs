import type { Component } from 'solid-js';

type Props = {
  code: string;
  indent: number;
};

export const Syntax: Component<Props> = props => {
  const trimmedCode = props.code.trim();

  return (
    <div
      class='text-gray-400'
      style={{ 'padding-left': `${props.indent * 1}rem` }}
    >
      {trimmedCode.includes('Promise.resolve') ? (
        <>
          <span class='text-green-400'>Promise</span>.
          <span class='text-blue-400'>resolve</span>(
          <span class='text-orange-300'>
            '{trimmedCode.match(/'([^']+)'/)?.[1]}'
          </span>
          )
        </>
      ) : trimmedCode.includes('.then') ? (
        <>
          .<span class='text-blue-400'>then</span>(
          <span class='text-orange-300'>res</span>{' '}
          <span class='text-purple-400'>=&gt;</span>{' '}
          <span class='text-blue-400'>console</span>.
          <span class='text-yellow-300'>log</span>(res))
        </>
      ) : trimmedCode.includes('setTimeout') ? (
        <>
          <span class='text-blue-400'>setTimeout</span>((){' '}
          <span class='text-purple-400'>=&gt;</span> {'{'}
        </>
      ) : trimmedCode.match(/^}\s*,\s*\d+\)?$/) ? (
        <>
          {'}'},{' '}
          <span class='text-blue-400'>
            {trimmedCode.match(/\d+/)?.[0]}
          </span>
          )
        </>
      ) : trimmedCode.includes('console.log') ? (
        <>
          <span class='text-blue-400'>console</span>.
          <span class='text-yellow-300'>log</span>(
          <span class='text-orange-300'>
            '{trimmedCode.match(/'([^']+)'/)?.[1]}'
          </span>
          )
        </>
      ) : (
        <span class='text-gray-400'>{trimmedCode}</span>
      )}
    </div>
  );
};
